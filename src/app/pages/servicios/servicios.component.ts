import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { ServComponent } from "./serv/serv.component";

@Component({
  selector: 'app-servicios',
  imports: [HeaderComponent, FooterComponent, ServComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

}
