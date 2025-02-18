import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-sucursales',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css'
})
export class SucursalesComponent {

}
