import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [CommonModule , MatDialogModule , MatButtonModule , MatFormFieldModule , MatInputModule , MatDatepickerModule ,
     MatNativeDateModule , MatRadioModule , MatSelectModule , ReactiveFormsModule , MatDatepickerToggle , MatNativeDateModule , HttpClientModule , CommonModule],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;
  education:string[] = [
    'Bachelor of Science',
    'Master of Science',
    'PhD'
  ];
constructor(private _fb: FormBuilder , private _empService:EmployeeService , private _dialogRef: MatDialogRef<EmpAddEditComponent> , @Inject(MAT_DIALOG_DATA) public data:any){
  this.empForm = this._fb.group({
    firstName:['' , [Validators.required , Validators.minLength(3)]],
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:'',

  });
}
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    }

onSubmit(){
  if(this.empForm.valid){
    if(this.data){
      this._empService.updateEmployee(this.data.id ,this.empForm.value).subscribe({
        next: (val:any) =>{
        alert("Employee Data Updated.........")
        this._dialogRef.close(true);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
    }else{

      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val:any) =>{
        alert("Employee Added Successfully.....")
        this._dialogRef.close(true);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
    }
  }
}





}
