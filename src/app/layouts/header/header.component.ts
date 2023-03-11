import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  isOpen = false;
  userEmail!:any;

  ngOnInit(): void {
   this.userEmail = JSON.parse(localStorage.getItem('user')!).email;
   console.log(this.userEmail);

  }


  isShow() {
    this.isOpen = !this.isOpen;
  }


}
