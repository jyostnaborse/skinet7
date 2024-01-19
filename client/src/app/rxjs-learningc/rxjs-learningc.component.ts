import { Component, ElementRef, OnInit, ViewChild, ɵɵpureFunctionV } from '@angular/core';
import { Observable, Subscriber, count, debounceTime, distinct, filter, from, fromEvent, interval, max, min, of, skip, take, takeLast, takeWhile } from 'rxjs';

@Component({
  selector: 'app-rxjs-learningc',
  templateUrl: './rxjs-learningc.component.html',
  styleUrls: ['./rxjs-learningc.component.scss']
})
export class RxjsLearningcComponent implements OnInit{

// lecture 3
// agents?: Observable<string>;
// name: any;
// ngOnInit(): void {
//   this.agents = new Observable(
//     function(observer){
//       try {
//         observer.next("Jyo");
//         observer.next("xyz");
//         setInterval(() => observer.next("abc"), 3000);

//       }
//       catch(e){
//         observer.error(e);
  
//       }
//     }
//   );
//   this.agents.subscribe(data => {
//     this.name = data;

//   })

// }
 // OF operator
//  students = ['Mark', 'Joe', 'lis']
//  studentObs : Observable<string[]> = of(this.students);
//  studentObj ={
//   id:10,
//   name : 'Jyo'
//  }

//  studentObj$ :Observable<any> = of(this.studentObj)
// ngOnInit(): void {
//   this.studentObs.subscribe(data=>{
//     console.log(data);
   
//   });

//   this.studentObj$.subscribe(data => {
//     console.log(data);
//   })
// }

order = [1, 2, 3,3]
orderObs$ : Observable<number> = from(this.order)

ngOnInit(): void {
 this.orderObs$.subscribe(data=>{
   //console.log(data);
  
 });

//  const numbs$ =   interval(500).pipe(take(50));

//  numbs$.subscribe(data => {
//   console.log(data);
//  })

const numbs$ = interval(500);
// numbs$.pipe(
//   take(5), 
//   debounceTime(2000)).subscribe(data => {
//   console.log(data);
// })


// numbs$.pipe(
//   takeWhile(v => this.CheckCondition(v))
// ).subscribe(data => {
//   console.log(data);
// })

// numbs$.pipe(
//   takeLast(5)).subscribe(data =>{
//   console.log(data)
// });

numbs$.pipe(
  filter(v => checkFilter(v))).subscribe(data =>{
  //console.log(data)
});

this.orderObs$.pipe(distinct()).subscribe(data =>{
  //console.log(data);
})

this.orderObs$.pipe(skip(2)).subscribe(data =>{
  //console.log(data);
})

this.orderObs$.pipe(count()).subscribe(data =>{
  //console.log(data);
})

this.orderObs$.pipe(max()).subscribe(data =>{
  console.log(data);
})
}

CheckCondition(v:number):boolean{
  return(v > 3 )?false: true;
}


@ViewChild("btnEvent")
btnEventdata?:ElementRef;

//FromEvent
btnEventClick() {
  const btnEventObs$ = fromEvent(this.btnEventdata?.nativeElement, "click");
  btnEventObs$.subscribe(data => {
    console.log(data);
  })
  }
}
function checkFilter(v: number): boolean {
  return v < 10 ? true:false;
}

