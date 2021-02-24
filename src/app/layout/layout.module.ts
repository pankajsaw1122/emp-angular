import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material.module';
import { MatDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

import { SnackBarComponent } from '../shared/snackbar/snack-bar.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MaterialModule,
        NgbDropdownModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, MatDialogComponent, SnackBarComponent],
    entryComponents: [
        MatDialogComponent,
        SnackBarComponent
    ],
})
export class LayoutModule {}
