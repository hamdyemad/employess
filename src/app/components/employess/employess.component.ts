import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employess } from 'src/app/employess';
import { EmployessService } from 'src/app/employess.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employess',
  templateUrl: './employess.component.html',
  styleUrls: ['./employess.component.scss']
})
export class EmployessComponent implements OnInit {

  constructor(private employeeService: EmployessService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  onSubmit(f: NgForm) {
    const name = (f.value as Employess).name,
      position = (f.value as Employess).position,
      number = (f.value as Employess).number;
    this.employeeService.addInfo(name, position, number)
      .then(() => {
        this.toastr.success('has uploaded', name);
        f.resetForm();
      });
  }
}
