import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportdataService {
  constructor() {}

  createSheet(data, footerEnable) {
    const header = [];
    const ws = {};
    let R = 0;
    let C = 0;
    const styles = {
      tableHeader: {
        font: { bold: true },
        alignment: { vertical: 'center', horizontal: 'center' },
        border: {
          top: { style: 'thin', color: { auto: 1 } },
          bottom: { style: 'thin', color: { auto: 1 } },
          right: { style: 'thin', color: { auto: 1 } },
          left: { style: 'thin', color: { auto: 1 } }
        }
      },
      displayHeader: {
        font: { bold: true },
        alignment: { vertical: 'center', horizontal: 'center' },
        border: {
          top: { style: 'thin', color: { auto: 1 } },
          bottom: { style: 'thin', color: { auto: 1 } },
          right: { style: 'thin', color: { auto: 1 } },
          left: { style: 'thin', color: { auto: 1 } }
        },
        fill: { fgColor: { rgb: 'FF9CC3E6' } }
      },
      displayFooter: {
        font: { bold: true },
        alignment: { vertical: 'center', horizontal: 'center' },
        border: {
          top: { style: 'thin', color: { auto: 1 } },
          bottom: { style: 'thin', color: { auto: 1 } },
          right: { style: 'thin', color: { auto: 1 } },
          left: { style: 'thin', color: { auto: 1 } }
        }
      },
      default: {
        alignment: { vertical: 'center', horizontal: 'center' },
        border: {
          top: { style: 'thin', color: { auto: 1 } },
          bottom: { style: 'thin', color: { auto: 1 } },
          right: { style: 'thin', color: { auto: 1 } },
          left: { style: 'thin', color: { auto: 1 } }
        }
      },
      AliceBlue: {
        alignment: { vertical: 'center', horizontal: 'center' },
        border: {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
          left: { style: 'thin' }
        },
        fill: { fgColor: { rgb: 'FFE6E6FA' } }
      },
      LightCyan: {
        alignment: { vertical: 'center', horizontal: 'center' },
        border: {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
          left: { style: 'thin' }
        },
        fill: { fgColor: { rgb: 'FFE0FFFF' } }
      },
      PeachPuff: {
        alignment: { vertical: 'center', horizontal: 'center' },
        border: {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
          left: { style: 'thin' }
        },
        fill: { fgColor: { rgb: 'FFFFDAB9' } }
      },
      white: {
        alignment: { vertical: 'center', horizontal: 'center' },
        border: {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
          left: { style: 'thin' }
        }
      },
      disclaimer: {
        alignment: { vertical: 'center', horizontal: 'left' },
        font: { color: { rgb: 'FFFF0000' } }
      }
    };

    const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    const pattern = /^\d+$/;
    let wchwidth = 0,
      defaultValue,
      currentValue = 0,
      parse = true;

    if (range.s.r > R) {
      range.s.r = R;
    }
    if (range.s.c > C) {
      range.s.c = C;
    }
    if (range.e.r < R) {
      range.e.r = R;
    }
    if (range.e.c < C) {
      range.e.c = C;
    }
    let cell = {},
      cell_ref = '',
      styinfo = false,
      colsize = [];

    if (data.length) {
      data.forEach((tabledata, tblNo) => {
        if (tabledata['data'].length) {
          if (
            tabledata.columnDefs[0]['exportConfig'].hasOwnProperty('styleinfo')
          ) {
            styinfo = true;
          }
          tabledata.columnDefs.forEach((hvalue, hkey) => {
            let headerObj = {};
            if (styinfo) {
              headerObj = Object.assign({}, headerObj, {
                heading: hvalue.field,
                format: hvalue['exportConfig'].format,
                styleinfo: hvalue['exportConfig']['styleinfo']
              });
            } else {
              headerObj = Object.assign({}, headerObj, {
                heading: hvalue.field,
                format: hvalue['exportConfig'].format
              });
            }
            if (hvalue.hasOwnProperty('defaultValue')) {
              headerObj = Object.assign({}, headerObj, {
                defaultValue: hvalue.defaultValue
              });
            }
            header.push(headerObj);

            if (typeof hvalue.width !== 'undefined') {
              wchwidth = pattern.test(hvalue.width)
                ? parseInt(hvalue.width, 10) / 4
                : parseInt(hvalue.width, 10) * 2;
              colsize.push({ wch: wchwidth });
            } else {
              colsize.push({ wch: 20 });
            }
            C = hkey as number;
            if (range.s.r > R) {
              range.s.r = R;
            }
            if (range.s.c > C) {
              range.s.c = C;
            }
            if (range.e.r < R) {
              range.e.r = R;
            }
            if (range.e.c < C) {
              range.e.c = C;
            }
            cell['s'] = styles.displayHeader;
            cell['v'] = hvalue.displayName;
            cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
            if (typeof cell['v'] === 'number') {
              cell['t'] = 'n';
            } else {
              cell['t'] = 's';
            }
            ws[cell_ref] = cell;
            cell = {};
            cell_ref = '';
          });
          R++;
          tabledata.data.forEach((value, key) => {
            let showFooter = false;
            if (footerEnable && key === tabledata.data.length - 1) {
              showFooter = true;
            }
            header.forEach((val, hkey) => {
              C = hkey;
              if (range.s.r > R) {
                range.s.r = R;
              }
              if (range.s.c > C) {
                range.s.c = C;
              }
              if (range.e.r < R) {
                range.e.r = R;
              }
              if (range.e.c < C) {
                range.e.c = C;
              }
              defaultValue = 'N/A';
              parse = true;
              currentValue = value[val['heading']];
              if (val.hasOwnProperty('defaultValue') === true) {
                val['defaultValue'].conditions.forEach(condition => {
                  if (condition === currentValue) {
                    defaultValue = val['defaultValue'].value;
                    parse = false;
                  }
                });
              }
              if (
                currentValue === null ||
                typeof currentValue === 'undefined'
              ) {
                parse = false;
              }
              if (val['format'] === 'number') {
                cell['s'] =
                  val.hasOwnProperty('styleinfo') === true
                    ? showFooter
                      ? styles.displayFooter
                      : styles[val['styleinfo'].tdata]
                    : showFooter
                    ? styles.displayFooter
                    : styles.default;
                cell['v'] =
                  parse === false
                    ? defaultValue
                    : parseInt(currentValue.toString(), 10);
                cell['z'] = '#,##0';
                cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                if (typeof cell['v'] === 'number') {
                  cell['t'] = 'n';
                } else {
                  cell['t'] = 's';
                }
                ws[cell_ref] = cell;
              } else if (val['format'] === 'currency') {
                cell['s'] =
                  val.hasOwnProperty('styleinfo') === true
                    ? showFooter
                      ? styles.displayFooter
                      : styles[val['styleinfo'].tdata]
                    : showFooter
                    ? styles.displayFooter
                    : styles.default;
                cell['v'] =
                  parse === false
                    ? defaultValue
                    : parseFloat(currentValue.toString());
                cell['z'] = '$#,##0.00';
                cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                if (typeof cell['v'] === 'number') {
                  cell['t'] = 'n';
                } else {
                  cell['t'] = 's';
                }
                ws[cell_ref] = cell;
              } else if (val['format'] === 'currency_inr') {
                cell['s'] =
                  val.hasOwnProperty('styleinfo') === true
                    ? showFooter
                      ? styles.displayFooter
                      : styles[val['styleinfo'].tdata]
                    : showFooter
                    ? styles.displayFooter
                    : styles.default;
                cell['v'] =
                  parse === false
                    ? defaultValue
                    : parseFloat(currentValue.toString());
                cell['z'] = '₹#,##0.00';
                cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                if (typeof cell['v'] === 'number') {
                  cell['t'] = 'n';
                } else {
                  cell['t'] = 's';
                }
                ws[cell_ref] = cell;
              } else if (val['format'] === 'decimal') {
                cell['s'] =
                  val.hasOwnProperty('styleinfo') === true
                    ? showFooter
                      ? styles.displayFooter
                      : styles[val['styleinfo'].tdata]
                    : showFooter
                    ? styles.displayFooter
                    : styles.default;
                cell['v'] =
                  parse === false
                    ? defaultValue
                    : parseFloat(currentValue.toString());
                cell['z'] = '#,##0.00';
                cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                if (typeof cell['v'] === 'number') {
                  cell['t'] = 'n';
                } else {
                  cell['t'] = 's';
                }
                ws[cell_ref] = cell;
              } else if (val['format'] === 'date') {
                cell['s'] =
                  val.hasOwnProperty('styleinfo') === true
                    ? showFooter
                      ? styles.displayFooter
                      : styles[val['styleinfo'].tdata]
                    : showFooter
                    ? styles.displayFooter
                    : styles.default;
                cell['v'] =
                  parse === false
                    ? defaultValue
                    : this.datenum(new Date(currentValue), false);
                cell['z'] = XLSX.SSF['_table'][14];
                cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                if (typeof cell['v'] === 'number') {
                  cell['t'] = 'n';
                } else {
                  cell['t'] = 's';
                }
                ws[cell_ref] = cell;
              } else if (val['format'] === 'percentage') {
                cell['s'] =
                  val.hasOwnProperty('styleinfo') === true
                    ? showFooter
                      ? styles.displayFooter
                      : styles[val['styleinfo'].tdata]
                    : showFooter
                    ? styles.displayFooter
                    : styles.default;
                cell['v'] =
                  parse === false
                    ? defaultValue
                    : parseFloat(currentValue.toString()) / 100;
                cell['z'] = '0.00%';
                cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                if (typeof cell['v'] === 'number') {
                  cell['t'] = 'n';
                } else {
                  cell['t'] = 's';
                }
                ws[cell_ref] = cell;
              } else {
                cell['s'] =
                  val.hasOwnProperty('styleinfo') === true
                    ? showFooter
                      ? styles.displayFooter
                      : styles[val['styleinfo'].tdata]
                    : showFooter
                    ? styles.displayFooter
                    : styles.default;
                cell['v'] = parse === false ? defaultValue : currentValue;
                cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                cell['t'] = 's';
                ws[cell_ref] = cell;
              }
              cell = {};
              cell_ref = '';
            });
            R++;
          });
        }
      });
    }

    if (range.s.c < 10000000) {
      ws['!ref'] = XLSX.utils.encode_range(range);
    }
    ws['!cols'] = colsize;
    return ws;
  }

  datenum(v, date1904) {
    if (date1904) {
      v += 1462;
    }
    const epoch = Date.parse(v);
    return (
      (epoch - new Date(Date.UTC(1899, 11, 30)).valueOf()) /
      (24 * 60 * 60 * 1000)
    );
  }

  Workbook() {
    if (!(this instanceof XLSX['WorkBook'])) {
      return XLSX.utils.book_new();
    }
    // this.SheetNames = [];
    // this.Sheets = {};
  }

  string2ArrayBuffer(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  exportReport(data, filename, format, footerEnable) {
    const wb = XLSX.utils.book_new();
    console.log(wb);
    data.forEach((worksheet, index) => {
      wb.Sheets[worksheet.sheetname] = this.createSheet(
        worksheet.data,
        // [],
        footerEnable
      );
      // wb.Sheets[worksheet.sheetname]['!images'] = [
      //   {
      //     name: 'image1.jpg',
      //     data:
      //       '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',
      //     opts: { base64: true },
      //     position: {
      //       type: 'twoCellAnchor',
      //       attrs: { editAs: 'oneCell' },
      //       from: { col: 9, row: 67 },
      //       to: { col: 15, row: 77 }
      //     }
      //   },
      //   {
      //     name: 'image2.jpg',
      //     data:
      //       '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',
      //     opts: { base64: true },
      //     position: {
      //       type: 'twoCellAnchor',
      //       attrs: { editAs: 'oneCell' },
      //       from: { col: 9, row: 54 },
      //       to: { col: 15, row: 65 }
      //     }
      //   }
      // ];
      wb.SheetNames.push(worksheet.sheetname);
    });

    this.exportIt(format, wb, filename);
  }

  exportIt(format, wb, filename) {
    let extension = '';
    let name = '';
    if (format === 'Excel') {
      let mime =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        extension = '.xlsx',
        name = filename,
        excelData;
      const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' },
        wbout = XLSX.write(wb, wopts as XLSX.WritingOptions);
      excelData = this.string2ArrayBuffer(wbout);
      saveAs(
        new Blob([excelData], { type: mime + ';' + 'charset=utf-8' }),
        name + extension
      );
    } else if (format === 'CSV') {
      const mime = 'text/csv';
      (extension = '.csv'), (name = filename);
      const result = [];
      wb.SheetNames.forEach(sheetName => {
        const rObjArr = XLSX.utils.sheet_to_csv(wb.Sheets[sheetName]);
        if (rObjArr.length > 0) {
          result.push('Table ' + sheetName);
          result.push('');
          result.push(rObjArr);
        }
      });
      const csvData = result.join('\n');
      saveAs(
        new Blob([csvData], { type: mime + ';' + 'charset=utf-8' }),
        name + extension
      );
    } else {
      const mime = 'application/json';
      (extension = '.json'), (name = filename);
      const result = {};
      wb.SheetNames.forEach(sheetName => {
        const rObjArr = XLSX.utils['sheet_to_row_object_array'](
          wb.Sheets[sheetName]
        );
        if (rObjArr.length > 0) {
          result[sheetName] = rObjArr;
        }
      });
      saveAs(
        new Blob([JSON.stringify(result)], {
          type: `${mime};` + 'charset=utf-8'
        }),
        name + extension
      );
    }
  }
}
