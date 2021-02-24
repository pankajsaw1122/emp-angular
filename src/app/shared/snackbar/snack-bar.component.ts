import {Component, Inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.scss'],
  })
  export class SnackBarComponent {
    public message = '';
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
    ngOnInit() {
      this.message = this.data.message;
    }
  }