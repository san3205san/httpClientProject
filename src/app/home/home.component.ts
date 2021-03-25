import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
  products = [];
  destroy$:Subject<boolean> = new Subject<boolean>();
  constructor(private dataservice:DataService) { }

  ngOnInit(): void {
    debugger;

    this.dataservice.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data:any[])=>{
      debugger;
      console.log(data);
      this.products=data;
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();

  }

}
