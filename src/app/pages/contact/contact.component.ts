import { Component } from '@angular/core';
import { FooterComponent } from '../../componts/footer/footer.component';
import { HeaderComponent } from '../../componts/header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
