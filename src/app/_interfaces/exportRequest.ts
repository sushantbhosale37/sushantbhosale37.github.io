import { SheetDetails } from './sheetDetails';

export interface ExportRequest {
  sheetDetails: SheetDetails[];
  appName: string;
  sendEmail: string[];
  fileName: string;
  exportFormat: string;
}
