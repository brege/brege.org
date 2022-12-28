import { Observable } from 'rxjs';

const hello$ = new Observable(observer => {
  observer.next('Hello, World!');
});

hello$.subscribe(message => {
  console.log(message);
});
