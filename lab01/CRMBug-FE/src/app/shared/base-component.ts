import { Utils } from './../../shared/Utils';
import { Subject } from 'rxjs';
import { Directive, OnDestroy } from "@angular/core";

@Directive()
export abstract class BaseComponent implements OnDestroy {

  public _onDestroySub: Subject<void> = new Subject<void>();

  isHaveData: boolean = true;

  constructor() {
    
  }

  ngOnDestroy(): void {
    Utils.unSubscribe(this._onDestroySub)
  }
}