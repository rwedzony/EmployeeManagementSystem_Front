import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from "../../../datamodels/task";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TaskService} from "../../../services/task.service";
import {AuthService} from "../../../services/auth.service";
import {TaskAssigned} from "../../../datamodels/taskassigned";
import {UpdateEmpDialogComponent} from "../../../employee_dialogs/update/update-emp-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AssigntaskdialogComponent} from "../assigntaskdialog/assigntaskdialog.component";
import {AddtaskdialogComponent} from "../addtaskdialog/addtaskdialog.component";
import {DeleteEmpDialogComponent} from "../../../employee_dialogs/delete/delete-emp-dialog.component";
import {DeletetaskdialogComponent} from "../deletetaskdialog/deletetaskdialog.component";
import {EdittaskdialogComponent} from "../edittaskdialog/edittaskdialog.component";

@Component({
  selector: 'app-tasksadmin',
  templateUrl: './tasksadmin.component.html',
  styleUrls: ['./tasksadmin.component.scss']
})
export class TasksadminComponent implements OnInit {

  constructor(private taskService: TaskService,
              private authService: AuthService,
              public dialog: MatDialog) { }

  ELEMENT_DATA_TA: TaskAssigned[];

  ELEMENT_DATA_TU: Task[];

  displayedColumnsTa: string[] = ['id', 'description',
    'status','startDate','endDate','employeeFirstName','employeeLastName','actions'];

  displayedColumnsTu: string[] = ['id', 'description',
    'status','startDate','endDate','actions'];


  dataSourceTa = new MatTableDataSource<TaskAssigned>(this.ELEMENT_DATA_TA);

  dataSourceTu = new MatTableDataSource<Task>(this.ELEMENT_DATA_TU);

  @ViewChild('firstPaginator', {static: true}) paginatorTa: MatPaginator;
  @ViewChild('table1', {read: MatSort, static: true}) sortTa: MatSort;


  @ViewChild('secondPaginator', {static: true}) paginatorTu: MatPaginator;
  @ViewChild('table2', {read: MatSort, static: true}) sortTu: MatSort;



  ngOnInit(): void {

    this.dataSourceTa.paginator=this.paginatorTa;
    this.dataSourceTu.paginator = this.paginatorTu;


    this.dataSourceTa.sort=this.sortTa;
    this.dataSourceTu.sort=this.sortTu;


    this.getAllassignedTasks();
    this.getAllUnassignedTasks();

  }

  applyFilterTa(filterValue: string){
    this.dataSourceTa.filter = filterValue.trim().toLowerCase();
  }

  applyFilterTu(filterValue: string){
    this.dataSourceTu.filter = filterValue.trim().toLowerCase();
  }


  private getAllassignedTasks() {
    let resp=this.taskService.getAllassignedTasks();
    resp.subscribe(tasks=>this.dataSourceTa.data=tasks as TaskAssigned[])
  }

  public getAllUnassignedTasks(){
    let resp=this.taskService.getAllUnassignedTasks();
    resp.subscribe(tasks=>this.dataSourceTu.data=tasks as Task[])
  }


  addNewTask() {
    const dialogRef=this.dialog.open(AddtaskdialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getAllUnassignedTasks();
    });

  }

  assignTask(taskId: number) {
   // const dialogRef=this.dialog.open(AssigntaskdialogComponent,{data:{id: id,
        //       firstName:firstName,lastName:lastName,email:email,role:role,currentMonthWorkingHours:currentMonthWorkingHours}});

      const dialogRef=this.dialog.open(AssigntaskdialogComponent,{data:{taskId: taskId}});
      dialogRef.afterClosed().subscribe(result => {
      this.getAllassignedTasks();
      this.getAllUnassignedTasks();
        });
  }

  unassignTask(id: number) {
    let resp=this.taskService.changeTaskAssigment(id,false);
    resp.subscribe( (value) => {this.getAllassignedTasks();
    this.getAllUnassignedTasks()},
       (error) => {alert('Connection Error!!'+ error)},
    );
  }

  deleteTaskDialog(id: number) {
      const dialogRef=this.dialog.open(DeletetaskdialogComponent,{data:{id: id}});

      dialogRef.afterClosed().subscribe(result => {
        this.getAllUnassignedTasks();
        this.getAllassignedTasks();
      });

  }

  editTaskDialog(id: number,description: string, status: string, startDate: string, endDate: string) {
      const dialogRef=this.dialog.open(EdittaskdialogComponent,{data:{id: id,
          description:description,status: status, startDate:startDate, endDate:endDate}});
      dialogRef.afterClosed().subscribe(result => {
        this.getAllassignedTasks();
        this.getAllUnassignedTasks();
      });
  }
}
