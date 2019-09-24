import { Observable } from "rxjs/Observable";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from "@angular/router";

export interface CanComponentDeactivate {
    canCompDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(
        component: CanComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return component.canCompDeactivate();
    }
}