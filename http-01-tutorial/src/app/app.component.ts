import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPost().subscribe(
      response => {
        this.isFetching = false;
        this.loadedPosts = response;
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

}
