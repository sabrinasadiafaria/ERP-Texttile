## 0.4.0 - Module 04 Inventory & Store Management (2024-05-24)

### Added
- **Inventory Database Schema**: Generated extensive normalized tables for warehouse hierarchy (Zones, Racks, Shelves, Bins), Items, Batches, Receipts, Issues, Verifications, and Exceptions.
- **Inventory Manager Routing**: Integrated full navigation and routing mapped to the `Inventory & Store Manager` role.
- **Inventory Dashboard**: Built `InventoryDashboard.tsx` offering instant KPIs for Pending Receipts, QA Verifications, and dynamic material alerts.
- **Warehouse Management Structure**: Designed UI to configure physical storage layout natively.
- **Inbound & Verification Workflow**: Developed `MaterialReceiving.tsx` to handle Goods Receipt Notes (GRN) from POs and `MaterialVerification.tsx` to perform Quality Assurance before committing stock.
- **Material Issue Notes (MIN) Pipeline**: Created workflows for departments to make `MaterialRequests` and for Store Managers to issue `MaterialIssues`.
- **Exception Handling**: Implemented `Exceptions.tsx` for capturing returned materials and managing manual `Stock Adjustments`.
- **Finished Goods Handling**: Built interface for tracking cartons of fully produced items ready for shipment.
- **Inventory Reports**: Designed overview page for accessing extensive tracking logs and analytics.
