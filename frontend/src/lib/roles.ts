// Canonical role names and department configuration (single source of truth).

export const ROLES = {
  DIRECTOR: 'Director',
  ADMIN: 'Admin',
  MERCHANDISER: 'Merchandiser',
  YARN_MANAGER: 'Yarn Manager',
  INVENTORY_MANAGER: 'Inventory & Store Manager',
} as const;

export interface ProductionDepartmentConfig {
  department: string;
  displayName: string;
  previousDepartment: string | null;
  nextDepartment: string | null; // 'finished_goods' = hand-off to Inventory & Store
  pmRole: string;
  apmRole: string;
}

export const PRODUCTION_DEPARTMENTS: ProductionDepartmentConfig[] = [
  { department: 'knitting', displayName: 'Knitting', previousDepartment: null, nextDepartment: 'linking', pmRole: 'Knitting PM', apmRole: 'Knitting APM' },
  { department: 'linking', displayName: 'Linking', previousDepartment: 'knitting', nextDepartment: 'cutting_trimming', pmRole: 'Linking PM', apmRole: 'Linking APM' },
  { department: 'cutting_trimming', displayName: 'Cutting & Trimming', previousDepartment: 'linking', nextDepartment: 'sewing', pmRole: 'Cutting & Trimming PM', apmRole: 'Cutting & Trimming APM' },
  { department: 'sewing', displayName: 'Sewing', previousDepartment: 'cutting_trimming', nextDepartment: 'washing', pmRole: 'Sewing PM', apmRole: 'Sewing APM' },
  { department: 'washing', displayName: 'Washing', previousDepartment: 'sewing', nextDepartment: 'ironing', pmRole: 'Washing PM', apmRole: 'Washing APM' },
  { department: 'ironing', displayName: 'Ironing', previousDepartment: 'washing', nextDepartment: 'packaging', pmRole: 'Ironing PM', apmRole: 'Ironing APM' },
  { department: 'packaging', displayName: 'Packaging', previousDepartment: 'ironing', nextDepartment: 'finished_goods', pmRole: 'Packaging PM', apmRole: 'Packaging APM' },
];

export const DEPARTMENT_BY_KEY: Record<string, ProductionDepartmentConfig> =
  Object.fromEntries(PRODUCTION_DEPARTMENTS.map((d) => [d.department, d]));

export const PRODUCTION_ROLES: string[] = PRODUCTION_DEPARTMENTS.flatMap((d) => [d.pmRole, d.apmRole]);

export const ALL_ROLES: string[] = [...Object.values(ROLES), ...PRODUCTION_ROLES];

export function getDepartmentForRole(role: string | null | undefined): ProductionDepartmentConfig | null {
  if (!role) return null;
  return PRODUCTION_DEPARTMENTS.find((d) => d.pmRole === role || d.apmRole === role) ?? null;
}

export function isPM(role: string | null | undefined): boolean {
  return !!role && PRODUCTION_DEPARTMENTS.some((d) => d.pmRole === role);
}

export function isAPM(role: string | null | undefined): boolean {
  return !!role && PRODUCTION_DEPARTMENTS.some((d) => d.apmRole === role);
}

export function getRolePath(role: string): string {
  switch (role) {
    case ROLES.INVENTORY_MANAGER: return 'inventory-manager';
    case ROLES.YARN_MANAGER: return 'yarn-manager';
    case ROLES.MERCHANDISER: return 'merchandiser';
    case ROLES.ADMIN: return 'admin';
    case ROLES.DIRECTOR: return 'director';
    default: return role.toLowerCase().replace(/ & /g, '-').replace(/&/g, '-').replace(/\s+/g, '-');
  }
}
