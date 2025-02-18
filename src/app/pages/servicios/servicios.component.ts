import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-servicios',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

}
