import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../shared/event.model';

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container { padding-left:20px; padding-right: 20px; }
    .event-image { height:100px; }
    a {cursor: pointer}
    `]
})
export class EventDetailComponent implements OnInit {
  event: IEvent;
  addMode: boolean;
  filterBy = 'all';
  sortBy = 'votes';

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  // when we subscribe to the route parameters change and using that as navigation
  // to a different page in the same component we need to keep track of all state
  ngOnInit() {

    // this.route.params.forEach((params: Params) => { //--- ActivatedRoute has params
    // but also has data, we can access the data directly
      this.route.data.forEach((data) => {
      // if page was not being guarded this is the way --deleted the guard and added a resolver event-resolver (explanation of resolver)
      /*this.eventService.getEvent(+params['id']).subscribe((event: IEvent) => {
        this.event = event
        this.addMode = false
      })*/
      // this.event = this.route.snapshot.data['event'] // before
      this.event = data['event'];
      this.addMode = false;
    });
    // this.eve;nt = this.eventService.getEvent(+this.route.snapshot.params['id'])
    // why this one has a bug: when we navigate from /1 to /4 angular doesn't
    // restate the entire state of the component and reconstruct, all that happens is that the id param changes
    // Angular takes advantage of params from 'route' being an observable but 'snapshot'
    // is not, so - get the route, create a snapshot of it, a fix copy but we are not subscribing to any changes
    // so when 'id' changes we don't actually know
    // The bug is that when we change from event to event we don't change component -
    //  we are notified though an observable - we got to subscribe to the routeParams

  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
;
