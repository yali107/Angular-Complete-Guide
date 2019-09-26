import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(postData: Post) {
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-4a2c3.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe(responseData => {
        console.log(responseData.body);
      }, err => {
        this.error.next(err.message);
      });
  }

  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get<{ [key: string]: Post }>(
      'https://ng-complete-guide-4a2c3.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: searchParams,
        responseType: 'json'
      }
    )
      .pipe(map(responseData => {
        const responseArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            responseArray.push({ ...responseData[key], id: key })
          };
        }
        return responseArray;
      }), catchError(errRes => {
        // For analytics
        return throwError(errRes);
      })
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://ng-complete-guide-4a2c3.firebaseio.com/posts.json',
      {
        observe: 'events'
      }).pipe(
        // tap - to to something without touching or altering the observable flow
        tap(
          event => {
            console.log(event);
            if (event.type === HttpEventType.Sent) {
              console.log(event.type);
            }
            if (event.type === HttpEventType.Response) {
              console.log(event.body);
            }
          }
        )
      );
  }
}
