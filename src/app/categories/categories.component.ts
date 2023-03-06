import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  constructor(private fs: AngularFirestore) {}

  onSubmit(formData: any) {
    let categoryData = {
      category: formData.value.category,
    };
    this.fs
      .collection('categories')
      .add(categoryData)
      .then(docRef => {
        console.log(docRef);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
