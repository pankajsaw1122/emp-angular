import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ManageEmpRoutingModule } from './manage-emp-routing.module';
import { ManageEmpComponent } from './manage-emp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditComponent } from './add-edit/add-edit.component';

@NgModule({
    imports: [CommonModule, ManageEmpRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule],
    declarations: [ManageEmpComponent, AddEditComponent]
})
export class ManageEmpModule { }
