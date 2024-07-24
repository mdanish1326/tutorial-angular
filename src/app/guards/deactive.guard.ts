import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface IDeactivateGuard {
  canExit: () => boolean | Promise<boolean> | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class DeactiveGuard implements CanDeactivate<IDeactivateGuard> {
  canDeactivate(
    component: IDeactivateGuard,
    route: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return component.canExit();
  }
}