import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../../services/employee.service";
import {htmlAstToRender3Ast} from "@angular/compiler/src/render3/r3_template_transform";
import {Employee} from "../../../datamodels/employee";
import {TaskService} from "../../../services/task.service";

interface EmployeeToDisplay {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-assigntaskdialog',
  templateUrl: './assigntaskdialog.component.html',
  styleUrls: ['./assigntaskdialog.component.scss']
})
export class AssigntaskdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AssigntaskdialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private employeeService: EmployeeService,
              private taskService: TaskService) { }

  emptoDisplay:EmployeeToDisplay[];

  ngOnInit(): void {
  this.employeeService.getEmployees().subscribe(
    employees=>this.emptoDisplay =employees as EmployeeToDisplay[]
  );
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit(){

  }
  assignTask(id:number) {
    this.taskService.assignTask(this.data.taskId,id).subscribe();
  }
}
