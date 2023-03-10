import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/service/category.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  permaLink: string = '';
  imageSrc: any = '../../../assets/images/placeholder.webp';
  selectedImg: any = '';
  categories: any;
  postForm!: FormGroup;
  post: any;
  formStatus: string = 'Add';

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute
  ) {

    this.postForm = new FormGroup({
      title: new FormControl(),
      permalink: new FormControl(),
      excerpt: new FormControl(),
      category: new FormControl(),
      postimg: new FormControl(),
      content: new FormControl(),
    });

    this.route.queryParams.subscribe((val) => {
      this.postService.loadEditData(val['id']).subscribe((post) => {
        this.post = post;
        this.postForm = this.fb.group({
          title: [
            this.post.title,
            [Validators.required, Validators.minLength(10)],
          ],
          permalink: [this.post.permalink, Validators.required],
          excerpt: [
            this.post.excerpt,
            [Validators.required, Validators.minLength(50)],
          ],
          category: [
            `${this.post.category.categoryId}-${this.post.category.category}`,
            Validators.required,
          ],
          postimg: ['', Validators.required],
          content: [this.post.content, Validators.required],
        });
        this.imageSrc = this.post.postImgPath;
        this.formStatus = 'Edit'
      });
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChange(event: any) {
    const title = event.target.value;
    this.permaLink = title.replaceAll(' ', '-');
  }

  showPreview(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target?.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImg = event.target.files[0];
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      view: 0,
      status: 'new',
      createdAt: new Date(),
    };
    this.postService.uploadImage(this.selectedImg, postData);
    this.postForm.reset();
    this.imageSrc = '../../../assets/images/placeholder.webp';
  }
}
