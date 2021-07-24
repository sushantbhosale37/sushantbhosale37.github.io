// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as moment from 'moment-timezone';
export const environment = {
  baseUrl: 'http://localhost:8033/api',
  // baseUrl: 'http://cpcakeshopapi.somee.com/api',
  socketBaseUrl: 'http://localhost:8080',
  secret: 'TXlEYWFTc3ByaW5nQm9vdA==',
  adminRoles: ['YM MASTER ADMIN', 'FRANKLY MASTER ADMIN'],
  production: false,
  timeZone:  moment().tz('America/New_York').format('z')
  // new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }))
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
