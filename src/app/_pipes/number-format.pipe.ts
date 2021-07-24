import { Pipe, PipeTransform } from '@angular/core';
import * as accounting from 'node_modules/accounting/accounting.min.js';
import * as moment from 'moment';
@Pipe({ name: 'formatNum' })
export class FormatNumPipe implements PipeTransform {
  transform(value: string, format: string, config?: any[]): string {
    if (typeof value === 'undefined' || value === null) {
      return 'N/A';
    } else if (value === '') {
      return value;
    }
    switch (format) {
      case '':
        return value;
        break;
      case 'string':
        return value;
        break;
      case 'date':
        if (config.length === 0) {
          return moment(value, 'YYYYMMDD').format('MM-DD-YYYY');
        } else if (config.length === 2 && config[0] === 'mixed') {
          if (typeof value !== 'undefined' && value === config[1]) {
            return value;
          } else {
            return moment(value, 'YYYYMMDD').format('MM-DD-YYYY');
          }
        } else if (config.length === 3 && config[0] === 'custom') {
          return moment(value, config[1]).format(config[2]);
        } else {
          return moment(value, 'YYYYMMDD').format(config[0]);
        }
        break;
      case 'number':
        if (config.length === 0) {
          return accounting.formatNumber(parseFloat(value));
        } else {
          return accounting.formatNumber(
            parseFloat(value),
            '\'' + config.join('\',\'') + '\''
          );
        }
      case 'percentage':
        if (config.length === 0) {
          return `${accounting.formatNumber(parseFloat(value))}%`;
        } else {
          return (
            accounting.formatNumber(parseFloat(value), config.join(',')) + '%'
          );
        }
      case 'floatNumber':
        if (config.length === 0) {
          return value;
        } else {
          return accounting.toFixed(parseFloat(value), config[0]);
        }
      default:
        if (config.length === 0) {
          return accounting.formatMoney(value, format);
        } else {
          return accounting.formatMoney(
            value,
            format,
            '\'' + config.join('\',\'') + '\''
          );
        }
    }
  }
}
