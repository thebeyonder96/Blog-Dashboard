import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit{
  postArray!:any;

  constructor(private posts:PostService){}

  ngOnInit(): void {
    this.posts.loadData().subscribe(val=>{
      console.log(val);
      this.postArray = val;
    })
  }


}
