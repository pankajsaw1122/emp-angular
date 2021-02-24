import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [MatButtonModule,
        MatCardModule,
        MatCommonModule,
        MatIconModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatListModule
    ],

    exports: [MatButtonModule,
        MatCardModule,
        MatCommonModule,
        MatIconModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatListModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})

export class MaterialModule {

}

