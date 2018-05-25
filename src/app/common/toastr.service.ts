import { InjectionToken } from '@angular/core';

// this goes to the app.module
// declare let toastr:any

// TOASTR is an OBJECT - we created an object and as long we export this one and use
// this one to lookup in dependency injection no one can use the same, so no conflicts (different instance)
// example if we created a TOASTR_TOKEN with other lookup string
export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');
// the ('toastr') is a token to lookup the toastr object inside dependency injection registry
// could have used any instead of Toastr, but this one is simple

export interface Toastr {
  success(msg: string, title ?: string): void;
  info(msg: string, title?: string): void;
  warning(msg: string, title?: string): void;
  error(msg: string, title?: string): void;
}
