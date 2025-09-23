import { Component } from '@angular/core';
import { FooterComponent } from '../../componts/footer/footer.component';
import { HeaderComponent } from '../../componts/header/header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
