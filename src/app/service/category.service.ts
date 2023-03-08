import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements OnInit {
  constructor(private fs: AngularFirestore, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.loadData();
  }

  saveData(data: any) {
    this.fs
      .collection('categories')
      .add(data)
      .then((docRef) => {
        this.toastr.success('Category Inserted Successfully !');
        console.log(docRef);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadData() {
    return this.fs
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id,data}
          });
        })
      )
  }

  update(id:any,editedData:any){
    this.fs.collection('categories').doc(id).update(editedData).then(docRef=>{
      this.toastr.success('Data Updated Successfully');
    })
  }

  delete(id:any){
    this.fs.collection('categories').doc(id).delete().then(docRef=>{
    this.toastr.error('Data Deleted Successfully')
    })
  }
}
