import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared/event.model';

// declare let toastr //available t angular-cli.json - lets typescript know that (cant mock, cant test)

@Component({
  template:
    `
  <div>
    <h1>Upcoming Angular Events</h1>
    <hr>
    <div class="well">
    </div>
    <div class="row">
      <div *ngFor="let event of events" class="col-md-5">
        <event-thumbnail [event]="event"></event-thumbnail>
      </div>
    </div>
  </div>
  `
})
export class EventListComponent implements OnInit {
  events: IEvent[];
  // private means we have a property eventService equal to input eventService. like this.eventService = eventService
  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.eventService.getEvents().subscribe(events => {this.events = events})
    this.events = this.route.snapshot.data['events'];
    // comes from route resolver and it is used like this to wait for the response before we render the page
  }
}
