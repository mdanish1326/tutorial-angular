import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-outer-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './outer-layout.component.html',
  styleUrl: './outer-layout.component.scss'
})
export class OuterLayoutComponent {

}
