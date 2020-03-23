import { Component, } from '@angular/core';
import { Observable, observable } from 'rxjs'
import { ReplaySubject } from 'rxjs'
import { of, from, concat, merge,forkJoin,interval} from 'rxjs';

import { map, endWith,delay, take,switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';


  ngOnInit() {
    const nums = of(1, 2, 3);
    const mulValues = map((val: number) => val * 2);
    const mulNums = mulValues(nums);
    mulNums.subscribe(x => console.log(x));

    const observableNumbers$ = from([10, 20, 30]);
    const observableNumbers2$ = from([4, 5, 6]);
    const subscription = observableNumbers$.subscribe(x => console.log(x));

    observableNumbers$.pipe(map(x => x * x)).subscribe(resp => {
      console.log("PIPE & MAP:", resp)
    })

    merge(observableNumbers$, observableNumbers2$).pipe(map(x => x + 10)).subscribe(resp => {
      console.log("merge example:", resp)
    })
    concat(
      of(1, 2, 3),
      // subscribed after first completes
      of(4, 5, 6),
      // subscribed after second completes
      of(7, 8, 9)
    )
      // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
      .subscribe(concatValue => {
        console.log("Concat example", concatValue);
      });

    const source$ = of('Hello', 'Friend', 'Goodbye');

    source$
      // emit on completion
      .pipe(endWith('Friend'))
      // 'Hello', 'Friend', 'Goodbye', 'Friend'
      .subscribe(val => { console.log("END WITH:", val) });


      const example = forkJoin(
        //emit 'Hello' immediately
        of('Hello'),
        //emit 'World' after 1 second
        of('World')
      );
      //output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
      const subscribe = example.subscribe(val => console.log(val));

      //
      observableNumbers$.pipe(
        switchMap(data => {
          if (!data) {
            return observableNumbers2$;
          }
        })
      );
  }

  ngOnDestroy() {

  }
}
