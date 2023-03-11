import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private storage: AngularFireStorage,
    private fs: AngularFirestore,
    private toast: ToastrService,
    private router: Router
  ) {}

  uploadImage(selectedImg: any, postData: Post, id: any, formStatus: string) {
    const filePath = `postImg/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImg).then(() => {
      console.log('Successful');
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;

          if (formStatus === 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
    });
  }

  saveData(postData: Post) {
    this.fs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toast.success('Data Inserted Successfully');
        this.router.navigate(['/posts']);
      });
  }

  loadData() {
    return this.fs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadEditData(id: any) {
    return this.fs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id: any, postData: Post) {
    this.fs
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toast.success('Data Updated Successfully');
        this.router.navigate(['/posts']);
      });
  }

  deleteImage(id:string,postImgPath:string){
    this.storage.storage.refFromURL(postImgPath).delete().then(()=>{
      this.deleteData(id)
    })
  }

  deleteData(id:string){
    this.fs.doc(`posts/${id}`).delete().then(()=>{
      this.toast.warning('Data Deleted...!')
    })
  }

  markFeatured(id:string,value:any){
    this.fs.doc(`posts/${id}`).update(value).then(()=>{
      this.toast.info('Featured Status Updated.');
    })
  }
}
