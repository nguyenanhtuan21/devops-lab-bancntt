import { Subject } from "rxjs";

export class Utils {
  /**
   * Thực hiện giải phóng bộ nhớ
   * Author: hhdang 25.4.2022
   */
  public static unSubscribe(_onDestrySub: Subject<void>) {
    if(_onDestrySub) {
      _onDestrySub.next();
      _onDestrySub.complete();
      _onDestrySub.unsubscribe();
    }
  }
}