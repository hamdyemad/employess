import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployessService } from 'src/app/employess.service';
import { ToastrService } from 'ngx-toastr';
import { Employess } from 'src/app/employess';

@Component({
  selector: 'app-employess-list',
  templateUrl: './employess-list.component.html',
  styleUrls: ['./employess-list.component.scss']
})
export class EmployessListComponent implements OnInit {

  @ViewChild('item') item: ElementRef;
  update: number = -1;
  employess: Array<Employess>;

  constructor(private employeService: EmployessService, private toastr: ToastrService) {
    this.employess = this.employeService.employess;
  }

  ngOnInit(): void {
    this.employeService.getInfo().subscribe(data => {
      this.employess = data.map(employee => {
        return {
          id: employee.payload.doc.id,
          name: employee.payload.doc.data()['name'],
          position: employee.payload.doc.data()['position'],
          number: employee.payload.doc.data()['number']
        };
      });
    });
  }


  removeEmployee(i: number) {
    this.employeService.removeEmployee(this.employess[i].id);
    this.toastr.error('was removed', this.employess[i].name)
  }

  showEmployee(i: number) {
    this.update = i;
    if (this.update == i) {
      (this.item.nativeElement as HTMLElement).style.cursor = 'auto';
    }
  }
  cancel(i: number) {
    this.update = -1;
    if (this.update = -1) {
      (this.item.nativeElement as HTMLElement).style.cursor = 'pointer';
    }
  }

  updateEmployee(i: number) {
    let name = this.employess[i].name,
      position = this.employess[i].position,
      number = this.employess[i].number;
    this.employeService.updateEmployee(this.employess[i].id, name, position, number)
      .then(() => {
        this.update = -1;
        this.toastr.info('', name + ' has updated');
        if (this.update = -1) {
          (this.item.nativeElement as HTMLElement).style.cursor = 'pointer';
        }
      })
  }

}
