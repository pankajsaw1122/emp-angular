import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    adminName: String = '';

    constructor(public router: Router, private apiService: ApiService) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        // this.adminName = localStorage.getItem('adminName');
        // let timeOut = parseInt(localStorage.getItem('timeOut'));
        // console.log(timeOut * 60 * 1000);
        // if (timeOut !== 0) {
        //     setTimeout(() => {
        //         this.apiService.updateAdminId(localStorage.getItem('authToken')).subscribe((data) => {
        //             this.router.navigate(['/login']);
        //         });
        //     }, timeOut * 60 * 1000);
        // }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        window.sessionStorage.clear();
        window.localStorage.clear();
    }
}
