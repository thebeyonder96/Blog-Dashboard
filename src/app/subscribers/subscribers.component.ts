import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../service/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit{
  subArray:any

  constructor(private subService:SubscribersService){}

  ngOnInit(): void {
    this.subService.loadData().subscribe(val=>{
      this.subArray = val;

    })
  }

  onDelete(id:string){
    this.subService.delete(id);
  }
}
