import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISession } from '../shared/event.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class VoterService {

  constructor(private http: HttpClient) { };

  deleteVoter(session: ISession, voterName: string, eventId: number) {
    session.voters = session.voters.filter(voter => voter !== voterName); // client side
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.delete(url)
    .pipe(catchError(this.handleError('addVoter')))
    .subscribe();
  }

  addVoter(session: ISession, voterName: string, eventId: number) {
    session.voters.push(voterName); // client side

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    const options = {headers: new HttpHeaders({'Content-Type': '/application/json'})};
    this.http.post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  userHasVoted(session: ISession, voterName: string) {
    return session.voters.some(voter => voter === voterName);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return Observable.of(result as T);
    };
  }
}
