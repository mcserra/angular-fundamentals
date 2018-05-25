import { Routes } from '@angular/router'; // typescript safety'

import {
  EventListComponent,
  EventDetailComponent,
  CreateEventComponent,
  EventListResolver,
  EventResolver,
  CreateSessionComponent
} from './events/index';

import { Error404Component } from './errors/404.component';

export const appRoutes: Routes = [
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
  { path: 'events', component: EventListComponent, resolve: { events: EventListResolver } },
  // before resolving this route call EventListResolver. when it finishes and returns data add
  // this data to the routes in a property named events to be consumed
  { path: 'events/:id', component: EventDetailComponent, resolve: { event: EventResolver } },
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  // prefix - redirect if the url starts with that path string // full - fully matches
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' }
];
