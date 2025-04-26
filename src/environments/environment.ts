// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripe: {
    publishableKey: 'pk_test_51RBMflC5XUlNtadFjuTGi1UkCccn4oBYw41MejAShGJqq93do95O81OpB38wSP02LvinuyLYFOeZASYb4K6YbPyY000GevLubp',
    secretKey: 'sk_test_51RBMflC5XUlNtadFTyzD8bmoX0uYYcYOf85t40iTeTwdQVTDGXzDlhUCRvavr2VIJ6MM3u1cXdbpIKSATrzfcXsd00SG3lq3C0'
  },
  api: 'https://silver-pig-246647.hostingersite.com/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
