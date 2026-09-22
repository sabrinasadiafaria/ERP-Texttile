export const PRODUCTION_ROLES = [
  'Knitting PM',
  'Knitting APM',
  'Linking PM',
  'Linking APM',
  'Cutting & Trimming PM',
  'Cutting & Trimming APM',
  'Production PM',
  'Production APM'
];

export function getRolePath(role: string): string {
  switch (role) {
    case 'Inventory & Store Manager': return 'inventory-manager';
    case 'Yarn Manager': return 'yarn-manager';
    case 'Merchandiser': return 'merchandiser';
    case 'Admin': return 'admin';
    case 'Director': return 'director';
    // All production roles use standardized dashed names
    default: return role.toLowerCase().replace(/ & /g, '-').replace(/&/g, '-').replace(/\s+/g, '-');
  }
}
