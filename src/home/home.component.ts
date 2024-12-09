import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterModule} from '@angular/router';
@Component({
    selector: 'home',
    standalone: true,
    templateUrl: './home.component.html',
    imports: [
        RouterModule
    ],
    styleUrl: './home.component.css'
})
export class HomeComponent { }
