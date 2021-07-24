import { Request } from './request';
import { Disclaimer } from './disclaimer';
import { TotalFooter } from './totalFooter';
import { TableTitle } from './tableTitle';
import { Image } from './image';

export interface SheetDetails {
  columnDef: any[];
  sheetName: string;
  isRequest: boolean;
  request: Request;
  data: any[];
  disclaimer: Disclaimer[];
  totalFooter: TotalFooter;
  tableTitle: TableTitle;
  image: Image[];
}
