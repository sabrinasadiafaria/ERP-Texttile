import { supabase } from '../supabase';

export interface ProductionDepartmentConfig {
  department: string;
  displayName: string;
  previousDepartment: string | null;
  nextDepartment: string | null;
  pmRole: string;
  apmRole: string;
}

export const DEPARTMENTS: Record<string, ProductionDepartmentConfig> = {
  knitting: {
    department: 'knitting',
    displayName: 'Knitting',
    previousDepartment: null,
    nextDepartment: 'linking',
    pmRole: 'Knitting PM',
    apmRole: 'Knitting APM'
  },
  linking: {
    department: 'linking',
    displayName: 'Linking',
    previousDepartment: 'knitting',
    nextDepartment: 'cutting_trimming',
    pmRole: 'Linking PM',
    apmRole: 'Linking APM'
  },
  cutting_trimming: {
    department: 'cutting_trimming',
    displayName: 'Cutting & Trimming',
    previousDepartment: 'linking',
    nextDepartment: 'sewing',
    pmRole: 'Cutting & Trimming PM',
    apmRole: 'Cutting & Trimming APM'
  },
  sewing: {
    department: 'sewing',
    displayName: 'Sewing',
    previousDepartment: 'cutting_trimming',
    nextDepartment: 'washing',
    pmRole: 'Sewing PM',
    apmRole: 'Sewing APM'
  },
  washing: {
    department: 'washing',
    displayName: 'Washing',
    previousDepartment: 'sewing',
    nextDepartment: 'ironing',
    pmRole: 'Washing PM',
    apmRole: 'Washing APM'
  },
  ironing: {
    department: 'ironing',
    displayName: 'Ironing',
    previousDepartment: 'washing',
    nextDepartment: 'packaging',
    pmRole: 'Ironing PM',
    apmRole: 'Ironing APM'
  },
  packaging: {
    department: 'packaging',
    displayName: 'Packaging',
    previousDepartment: 'ironing',
    nextDepartment: 'finished_goods',
    pmRole: 'Packaging PM',
    apmRole: 'Packaging APM'
  }
};

export const productionService = {
  // Get active tasks for a specific department
  async getDepartmentTasks(department: string) {
    const { data, error } = await supabase
      .from('production_records')
      .select('*, projects(*)')
      .eq('department', department)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get transfers bound for a department
  async getIncomingTransfers(department: string) {
    const { data, error } = await supabase
      .from('production_transfers')
      .select('*, projects(*), source_production_record(*)')
      .eq('to_department', department)
      .eq('status', 'PENDING')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Accept incoming transfer and create a new production record
  async acceptTransfer(transferId: string, userId: string, acceptedQty: number, rejectedQty: number, damagedQty: number) {
    // 1. Get transfer details
    const { data: transfer, error: tErr } = await supabase
      .from('production_transfers')
      .select('*')
      .eq('id', transferId)
      .single();
    if (tErr) throw tErr;

    // 2. Update transfer status
    const { error: upErr } = await supabase
      .from('production_transfers')
      .update({
        status: acceptedQty < transfer.quantity ? 'PARTIALLY_ACCEPTED' : 'ACCEPTED',
        accepted_quantity: acceptedQty,
        rejected_quantity: rejectedQty,
        damaged_quantity: damagedQty,
        accepted_by: userId,
        accepted_at: new Date().toISOString()
      })
      .eq('id', transferId);
    if (upErr) throw upErr;

    // 3. Create production record for the receiving department
    const { data: newRecord, error: pErr } = await supabase
      .from('production_records')
      .insert({
        project_id: transfer.project_id,
        department: transfer.to_department,
        input_quantity: acceptedQty,
        planned_quantity: acceptedQty,
        status: 'RECEIVED',
        created_by: userId
      })
      .select()
      .single();
    if (pErr) throw pErr;

    // 4. Log Activity
    await supabase.from('activity_logs').insert({
      user_id: userId,
      action: 'ACCEPT_TRANSFER',
      module: 'production',
      entity_type: 'transfer',
      entity_id: transferId,
      description: `Accepted ${acceptedQty} items for ${transfer.to_department}`
    });

    return newRecord;
  },

  // Log production APM output
  async logProduction(recordId: string, userId: string, producedQty: number, rejectedQty: number, damagedQty: number) {
    const { data, error } = await supabase
      .from('production_records')
      .update({
        produced_quantity: producedQty,
        rejected_quantity: rejectedQty,
        damaged_quantity: damagedQty,
        status: 'QC_PENDING',
        updated_at: new Date().toISOString()
      })
      .eq('id', recordId)
      .select()
      .single();
    if (error) throw error;

    await supabase.from('activity_logs').insert({
      user_id: userId,
      action: 'UPDATE_PRODUCTION',
      module: 'production',
      entity_type: 'production_record',
      entity_id: recordId,
      description: `Logged production: ${producedQty} produced, ${rejectedQty} rejected, ${damagedQty} damaged.`
    });

    return data;
  },

  // PM Approves Production and creates Transfer
  async completeAndTransfer(recordId: string, userId: string, nextDepartment: string) {
    const { data: record, error: rErr } = await supabase
      .from('production_records')
      .select('*')
      .eq('id', recordId)
      .single();
    if (rErr) throw rErr;

    // 1. Mark current completed
    const { error: upErr } = await supabase
      .from('production_records')
      .update({ status: 'COMPLETED', updated_at: new Date().toISOString() })
      .eq('id', recordId);
    if (upErr) throw upErr;

    // 2. Create Transfer
    const validQty = record.produced_quantity;
    
    if (nextDepartment === 'finished_goods') {
      // Special logic for packaging to inventory
      // We will create a transfer to finished_goods
      const { data: transfer, error: tErr } = await supabase
        .from('production_transfers')
        .insert({
          project_id: record.project_id,
          from_department: record.department,
          to_department: 'finished_goods',
          source_production_record: record.id,
          quantity: validQty,
          status: 'PENDING',
          created_by: userId
        }).select().single();
      if (tErr) throw tErr;
      return transfer;
    }

    const { data: transfer, error: tErr } = await supabase
      .from('production_transfers')
      .insert({
        project_id: record.project_id,
        from_department: record.department,
        to_department: nextDepartment,
        source_production_record: record.id,
        quantity: validQty,
        status: 'PENDING',
        created_by: userId
      }).select().single();
    if (tErr) throw tErr;

    await supabase.from('activity_logs').insert({
      user_id: userId,
      action: 'CREATE_TRANSFER',
      module: 'production',
      entity_type: 'transfer',
      entity_id: transfer.id,
      description: `Transferred ${validQty} items from ${record.department} to ${nextDepartment}`
    });

    return transfer;
  }
};
