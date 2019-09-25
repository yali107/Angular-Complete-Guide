import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createAndStorePost(postData: Post) {
    this.http
      .post<{name: string}>(
        'https://ng-complete-guide-4a2c3.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPost() {
    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-4a2c3.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      const responseArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          responseArray.push({ ...responseData[key], id: key })
        };
      }
      return responseArray;
    }));
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-guide-4a2c3.firebaseio.com/posts.json');
  }
}
