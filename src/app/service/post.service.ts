import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage:AngularFireStorage) { }

  uploadImage(selectedImg:any){
    const filePath = `postImg/${Date.now()}`;
    console.log(filePath);
  }
}
