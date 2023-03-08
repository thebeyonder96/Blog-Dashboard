import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/service/category.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit{
  permaLink: string = '';
  imageSrc: any = '../../../assets/images/placeholder.webp';
  selectedImg:any='';
  categories:any;
  postForm!:FormGroup;

  constructor(private categoryService:CategoryService,private fb:FormBuilder,private postService:PostService){
    this.postForm = this.fb.group({
      title:['',[Validators.required,Validators.minLength(10)]],
      permalink:['',Validators.required],
      excerpt:['',[Validators.required,Validators.minLength(50)]],
      category:['',Validators.required],
      postimg:['',Validators.required],
      content:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val=>{
      this.categories = val;
    })
  }

  get fc(){
    return this.postForm.controls;
  }

  onTitleChange(event: any) {
    const title = event.target.value;
    this.permaLink = title.replaceAll(' ', '-');
  }

  showPreview(event:any){
    const reader = new FileReader();
    reader.onload = (e)=>{
      this.imageSrc = e.target?.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImg = event.target.files[0];
  }

  onSubmit(){
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);


    const postData:Post={
      title:this.postForm.value.title,
      permalink:this.postForm.value.permalink,
      category:{
        categoryId: splitted[0],
        category:splitted[1],
      },
      postImgPath:'',
      excerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured:false,
      view:0,
      status:'new',
      createdAt:new Date()
    }
    console.log(postData);

    this.postService.uploadImage(this.selectedImg)
  }


}
