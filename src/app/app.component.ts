import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component'
/**
 * The AppComponent of Angular which serves as the foundation
 * other components are rendered on top of
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /**
   * The title of the app, used in the tab header
   */
  title = 'bcsFanSiteFE';
}
