import * as moment from 'moment-timezone';
export const environment = {
  // baseUrl: 'http://127.0.0.1:8080/api',
  baseUrl: 'https://cpcakeshopapi.somee.com/api',
  socketBaseUrl: '',
  secret: 'TXlEYWFTc3ByaW5nQm9vdA==',
  adminRoles: ['YM MASTER ADMIN', 'FRANKLY MASTER ADMIN'],
  production: true,
  timeZone:  moment().tz('America/New_York').format('z')
};
