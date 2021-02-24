import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
    addEditEmployee: FormGroup;
    profileImage: File = null;
    id: string;
    departList = [];
    designList = [];
    message = {
        msgtext: '',
        msgColor: 0
    };
    text = '';
    constructor(private apiService: ApiService, private router: Router, private paramRoute: ActivatedRoute) { }
    ngOnInit() {
        this.id = this.paramRoute.snapshot.params['id'];
        console.log(this.id);
        if (this.id == '0') this.text = 'Add Employee';
        else this.text = 'Update Account';

        this.addEditEmployee = new FormGroup({
            id: new FormControl(this.id),
            fname: new FormControl('', [Validators.required]),
            lname: new FormControl('', [Validators.required]),
            department_id: new FormControl('', [Validators.required]),
            designation_id: new FormControl('', [Validators.required]),
            basic: new FormControl('', [Validators.required]),
            hra: new FormControl('', [Validators.required]),
            pf: new FormControl('', [Validators.required]),
            esi: new FormControl('', [Validators.required]),
            hiring_date: new FormControl('', [Validators.required]),
            end_date: new FormControl(''),

        });

        this.apiService.getDepartmentList().subscribe((data: any) => {
            console.log(data);
            if (data.status === 200 || data.status === '200') {
                console.log('Data fetched successfully');
                this.departList = data.data;
            } else {
                console.log('request failed');
            }
        });


        if (this.id !== '0') {
         
            this.apiService.employeebyId(this.id).subscribe((data: any) => {
                console.log(data);
                
                if (data.status === 200 || data.status === '200') {
                    console.log('Data fetched successfully');
                    this.addEditEmployee.get('fname').setValue(data.data.fname);
                    this.addEditEmployee.get('lname').setValue(data.data.lname);
                    this.addEditEmployee.get('department_id').setValue(parseInt(data.data.department_id));
                    this.onDepartSelect();
                    this.addEditEmployee.get('designation_id').setValue(data.data.designation_id);
                    this.addEditEmployee.get('basic').setValue(data.data.basic);
                    this.addEditEmployee.get('hra').setValue(data.data.hra);
                    this.addEditEmployee.get('pf').setValue(data.data.pf);
                    this.addEditEmployee.get('esi').setValue(data.data.esi);
                    this.addEditEmployee.get('hiring_date').setValue(data.data.hire_date);
                    this.addEditEmployee.get('end_date').setValue(data.data.end_date);


                } else {
                    console.log('request failed');
                }
            });
        }
    }

    onDepartSelect() {
        this.designList = [];
        this.apiService.getDesignationList(this.addEditEmployee.get('department_id').value).subscribe((data: any) => {
            console.log(data);
            if (data.status === 200 || data.status === '200') {
                console.log('Data fetched successfully');
                this.designList = data.data;
            } else {
                console.log('request failed');
            }
        });
    }




    onSubmit() {
        console.log('Submit clicked');
        if (this.id == '0') {
            this.myMessageFunc('Adding employee data please wait..', 1);

            this.apiService.addEmployee(this.addEditEmployee.value).subscribe((data: any) => {
                console.log(data);

                if (data.status === 200 || data.status === '200') {
                    console.log('Data fetched successfully');
                    this.myMessageFunc(data.message, 1);
                    Object.keys(this.addEditEmployee.controls).forEach(key => {
                        this.addEditEmployee.controls[key].setValue('');
                    });
                } else {
                    this.myMessageFunc(data.message, 2);
                }
            });
        } else {
            this.myMessageFunc('Updating account please wait..', 1);
            this.apiService.updateEmployee(this.addEditEmployee.value).subscribe((data: any) => {

                if (data.status === 200 || data.status === '200') {
                    console.log('Data fetched successfully');
                    this.myMessageFunc(data.message, 1);

                    setTimeout(() => {
                        this.router.navigate(['manage-emp']);
                    }, 3000);
                    
                    console.log(this.addEditEmployee.value);
                    console.log(data);
                } else {
                    this.myMessageFunc(data.message, 2);
                }
            });
        }
    }


    myMessageFunc(text, code) {
        this.message.msgtext = text;
        this.message.msgColor = code;
        setTimeout(() => {
            this.message.msgtext = '';
        }, 3000);
    }

}

