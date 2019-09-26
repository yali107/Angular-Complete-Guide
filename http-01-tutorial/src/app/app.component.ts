import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching;
  error = null;
  private errSub: Subscription;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.errSub = this.postsService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
      }
    );

    this.isFetching = true;
    this.postsService.fetchPost().subscribe(
      response => {
        this.isFetching = false;
        this.loadedPosts = response;
      }, error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPost().subscribe(
      response => {
        this.isFetching = false;
        this.loadedPosts = response;
      }, error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    );
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
  }
}
