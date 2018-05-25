import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EventService } from './shared/event.service';
import 'rxjs/add/operator/map';

@Injectable()
export class EventResolver implements Resolve<any> {

  constructor (private eventService: EventService) {}

  resolve(route: ActivatedRouteSnapshot){
    return this.eventService.getEvent(route.params['id']);
    // in a resolver a Observable subscribe to itself in other service would need '.subscribe'
  }
}
