import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { PlanesComponent } from "../../shared/planes/planes.component";

@Component({
  selector: 'app-servicios',
  imports: [HeaderComponent, FooterComponent, PlanesComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

}
