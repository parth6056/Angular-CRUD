import { DialogRef } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule} from '@angular/material/dialog'
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './services/employee.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,CommonModule, MatToolbarModule , MatIconModule,MatButtonModule , MatDialogModule , CommonModule ,MatTableModule , MatPaginatorModule , MatSortModule , MatFormFieldModule , ReactiveFormsModule , MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  displayColumns: string[] = ['id' , 'firstName' ,'lastName' , 'email' , 'dob' , 'gender' , 'education' , 'company' , 'experience' , 'package' , 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog , private _empService:EmployeeService){}
  ngOnInit() {
    this.getEmployee();
  }

  openAppEditForm(){
   const DialogRef =  this._dialog.open(EmpAddEditComponent);
   DialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val){
        this.getEmployee();
      }
    }
   })
  }

  getEmployee(){
    this._empService.getEmployee().subscribe({
      next : (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next: (res) =>{
        alert("Employee Deleted Successfully.....")
        this.getEmployee();
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any){
 const DialogRef =  this._dialog.open(EmpAddEditComponent , {
    data,
  });
  DialogRef.afterClosed().subscribe({
    next: (val) => {
      console.log(val);

      if(val){
        this.getEmployee();
      }
    }
   })

   }
}
