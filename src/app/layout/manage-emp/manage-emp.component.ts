import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/snackbar/snack-bar.component';

@Component({
    selector: 'app-manage-emp',
    templateUrl: './manage-emp.component.html',
    styleUrls: ['./manage-emp.component.scss'],
})
export class ManageEmpComponent implements OnInit {
    displayedColumns: string[] = ['id', 'fname', 'lname', 'depart_name', 'design_name', 'basic', 'hra', 'gross_salary', 'pf', 'esi', 'total_deduct', 'net_salary', 'hire_date','end_date','action'
    ];

    dataSource: MatTableDataSource<EmployeeData>;
    dataFilter: FormGroup;
    resultsLength = 0;
    resultData;
    filterData = '';
    message = {
        msgtext: '',
        msgColor: 0
    };
    text = '';
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private apiService: ApiService, private router: Router, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

    ngOnInit() {
        this.callAPI();
    }

    callAPI() {

        return this.apiService.getEmployeeList().subscribe((data: any) => {
            console.log(data.data);
            if (data.status === 200 || data.status === '200') {
                console.log('Data fetched successfully');
                console.log(data);
                this.dataSource = new MatTableDataSource(data.data);
                this.resultData = data.data;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.resultsLength = data.data.length;
            } else {
                console.log('request failed');
            }
        });;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    addAccount() {
        console.log('Function called');
        this.router.navigate(['manage-emp/add-edit', 0]);
    }

    onEditClick(id) {
        console.log('Function called');
        this.router.navigate(['manage-emp/add-edit', id]);
    }

    onDeleteClick(id) {
        console.log('Function called');
        const dialogRef = this.dialog.open(MatDialogComponent, {
            width: '380px',
            data: { confirmMessage: 'Are you sure you want to delete ?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
            if (result === true) {
                return this.apiService.deleteEmployee(id).subscribe((data: any) => {
                    console.log(data);
                    if (data.status === 200 || data.status === '200') {
                        console.log('Emploee deleted');
                        this.showSnackBar('Data deleted successfully');
                        this.ngOnInit();
                    } else {
                        console.log('delete request failed');
                        this.showSnackBar('Delete request failed');
                    }
                });
            }
        });
    }

    onSubmit() {

    }

    myMessageFunc(text, code) {
        this.message.msgtext = text;
        this.message.msgColor = code;
        setTimeout(() => {
            this.message.msgtext = '';
        }, 3000);
    }

    showSnackBar = (msg) => {
        this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 3 * 1000,
            data: { message: msg }
        });
    }

}

export interface EmployeeData {
    id: string;
    fname: string;
    lname: string;
    depart_name: string;
    design_name: string;
    basic: number;
    hra: number;
    gross_salary: number;
    pf: number;
    esi: number;
    total_deduct: number;
    net_salary: number;
    hire_date: Date;
    end_date: Date;
    action: any;
}

