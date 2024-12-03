import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
@Component({
    selector: 'home',
    standalone: true,
    templateUrl: './home.component.html',
    imports: [
        NgForOf
    ],
    styleUrl: './home.component.css'
})
export class HomeComponent { }
