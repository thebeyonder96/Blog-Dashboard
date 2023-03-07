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
    this.categoryService.saveData(categoryData);
    formData.reset();
  }
}
