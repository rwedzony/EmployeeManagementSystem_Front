import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../services/employee.service";
import { Employee } from 'src/app/datamodels/employee';

@Component({
  selector: 'app-update',
  templateUrl: './update-emp-dialog.component.html',
  styleUrls: ['./update-emp-dialog.component.scss']
})
export class UpdateEmpDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateEmpDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private employeeService: EmployeeService) { }

  employee: Employee;

  ngOnInit(): void {
    this.employee=new Employee();
    this.employee.id=this.data.id;
    this.employee.firstName=this.data.firstName;
    this.employee.lastName=this.data.lastName;
    this.employee.email=this.data.email;
    this.employee.salary=this.data.salary;
    this.employee.occupation=this.data.occupation;
    this.employee.empAuthLevel=this.data.empAuthLevel;
    this.employee.currentMonthWorkingHours= this.data.currentMonthWorkingHours;
    this.employee.remainingDayOffs=this.data.remainingDAyOffs;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  confirmEdit() {
      this.employeeService.updateEmployee(this.employee);
      this.dialogRef.close();
  }
  submit(){

  }
}
