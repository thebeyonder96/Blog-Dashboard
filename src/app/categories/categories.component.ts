import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../models/category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categoryArray!:any;
  formCategory!:string;
  formStatus:string = 'Add';
  categoryId!:number;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((d) => {
      console.log(d);
      this.categoryArray = d;
    });
  }

  onSubmit(formData: any) {
    console.log(formData);
    let categoryData: CategoryModel = {
      category: formData.value.category,
    };

    if(this.formStatus === 'Add'){
      this.categoryService.saveData(categoryData);
      formData.reset();
    }
    else if(this.formStatus === 'Edit'){
      this.categoryService.update(this.categoryId,categoryData)
      formData.reset();
      this.formStatus = 'Add'
    }
  }

  edit(val:any,id:any){
    this.formCategory = val;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id:any){
    this.categoryService.delete(id);
  }


}
