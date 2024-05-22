import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RocketDataComponent} from "./rocket-data/rocket-data.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RocketDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
