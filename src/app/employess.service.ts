import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employess } from './employess';

@Injectable({
  providedIn: 'root'
})
export class EmployessService {

  constructor(private fs: AngularFirestore) { }

  employess: Array<Employess> = [];

  getInfo() {
    return this.fs.collection('employess').snapshotChanges();
  }

  addInfo(name: string, position: string, number: string) {
    return this.fs.collection('employess').add({
      name,
      position,
      number
    });
  }


  removeEmployee(id) {
    return this.fs.doc('employess/' + id).delete();
  }

  updateEmployee(id, name, position, number) {
    return this.fs.doc('employess/' + id).update({
      name,
      position,
      number
    });
  }
}
