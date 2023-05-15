import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/common-ui-models/project';
import { ProjectStatus } from 'src/app/common-ui-models/projectStatus';
import { DashboardService } from 'src/app/common-ui-services/dashboard.service';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { Moment } from 'moment';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";



@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],

})
export class AddProjectComponent implements OnInit {

  form: FormGroup;
  memberSelectArray:Array<Number>;
  startDate = new Date(2022, 1, 1);
  submitted:Boolean =false;
  date = new Date();
  projectStatuses : ProjectStatus[] = new Array<ProjectStatus>();
  minDate: Date;
  maxDate: Date;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  noOfTeamMembers = new Array<number>();
  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data: { message: string },
    public dialogRefAddProject: MatDialogRef<AddProjectComponent>, private dashboardService :DashboardService)
    {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 3, 0, 1);
      this.maxDate = new Date(currentYear + 5, 11, 31);

    }

  ngOnInit(): void {
    this.memberSelectArray = new Array<Number>();
    for(var i=1;i<20;i++){
      this.memberSelectArray.push(i);
    }
    this.dashboardService.fetchAllProjectStatuses().subscribe(
      (response: ProjectStatus[]) =>
      {
        if(response!=undefined){
          response.forEach(x=>{
            if(x!=undefined){
              this.projectStatuses.push(x);
            };
          })
        }

      }
    );
    this.form = this.fb.group({
      name: ['', [Validators.required,Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      status: ['', Validators.required],
      projectManager: ['',[Validators.required,Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      noOfTeamMembers: ['',Validators.required],
      createdOn: ['',[Validators.required,this.datePickerValidator()]],
      projectCost:['',[Validators.required,Validators.pattern('^[0-9]+$')]],
      availableFunds:['',[Validators.pattern('^[0-9]+$')]],
      currentExpenditure:['',[Validators.pattern('^[0-9]+$')]]
    });

  }
  get addForm() {
    return this.form.controls;
  }
  dateChangeHandler(date:string){
//     console.log(date);
// console.log("Date is",date.getMonth()+1 + '/'+ date.getDate()+"/" + date.getFullYear());
// this.adapter.format(date,'MM/DD/YYYY');
// console.log(this.adapter.format(date,'MM/DD/YYYY'));

// this.form.get('createdOn')?.setValue(date.getMonth()+1 + '/'+ date.getDate()+"/" + date.getFullYear());
console.log(Date.parse(date) > 0 ? true : false);

  }

  datePickerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let forbidden = true;
      if (control.value) {
        const moment: Moment = control.value;
       forbidden = false;
      }
      return forbidden ? { 'invalidDOBYear': true } : null;
    };
  }
  getDateError(val:number):any{
   if (val ==0){return this.minDate.getMonth()+1 + '/'+ this.minDate.getDate()+"/" + this.minDate.getFullYear()}
   else if(val ==1){return this.maxDate.getMonth()+1 + '/'+ this.maxDate.getDate()+"/" + this.maxDate.getFullYear()}
   else{ return 'Invalid date entered'}
   // return this.form.get('createdOn')?.hasError('required')? 'Date is required' : this.form.get('createdOn')?.hasError('pattern')? 'Date should be in MM/DD/YYY format':''
  }

  onSubmit(formData:any):void {
    this.submitted = true;
    if (this.form.invalid) {
      for (const control of Object.keys(this.form.controls)) {
        this.form.controls[control].markAsTouched();
      }
      return;
    }
    else{
      this.form.get('projectCost')?.setValue(this.convertToNumber(this.form.get('projectCost')?.value));
      this.form.get('availableFunds')?.setValue(this.convertToNumber(this.form.get('availableFunds')?.value));
      this.form.get('currentExpenditure')?.setValue(this.convertToNumber(this.form.get('currentExpenditure')?.value));

      this.dashboardService.addProject(this.form.value).subscribe(
        (response: Project) =>
        {
          console.log('result is', response);
          this.dialogRefAddProject.close();
          this.showSnackbarSuccess('Save Successfull','Close',3000)

        },
        error =>{
          console.log(error?.message);
          this.showSnackbarFailure('Some error occured..Please try again','Close',3000)
        }
      );

    }
  }

  showSnackbarSuccess(content:any, action:any, duration:number) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style-succ"],
      verticalPosition: this.verticalPosition,
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
  showSnackbarFailure(content:any, action:any, duration:number) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style-fail"],
      verticalPosition: this.verticalPosition,
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  convertToNumber(input:any){
if(input){
  if(typeof input== "string"){
    return parseInt(input);
  }
  else if (typeof input == "number"){
return input;
  }
  else
  {
    return input;
  }
}
  }


  fetchAllProjectStatus(){

  }
}
