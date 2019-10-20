import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}
  // loadedFeature: string = 'recipe';
  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.authService.autoLogin();

    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
