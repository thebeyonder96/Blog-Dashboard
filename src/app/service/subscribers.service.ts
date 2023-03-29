import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private fs: AngularFirestore,private toast:ToastrService) {}

  loadData() {
    return this.fs
      .collection('subscribers')
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

  delete(id: any) {
    this.fs
      .collection('subscribers')
      .doc(id)
      .delete()
      .then((docRef) => {
        this.toast.error('Data Deleted Successfully');
      });
  }
}
