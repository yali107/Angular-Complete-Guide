import { NgModule } from "@angular/core";

import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.modules';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild(
            [{ path: 'auth', component: AuthComponent }]
        )
    ]
})
export class AuthModule { }