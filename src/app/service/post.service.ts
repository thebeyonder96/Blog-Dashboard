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
    private router:Router
  ) {}

  uploadImage(selectedImg: any, postData: Post) {
    const filePath = `postImg/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImg).then(() => {
      console.log('Successful');
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;
          this.saveData(postData);
        });
    });
  }

  saveData(postData: Post) {
    this.fs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toast.success('Data Inserted Successfully');
        this.router.navigate(['/posts'])
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
}
