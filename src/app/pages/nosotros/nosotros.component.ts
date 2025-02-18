import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { HistoriaComponent } from "./historia/historia.component";
import { PartnersComponent } from "./partners/partners.component";

@Component({
  selector: 'app-nosotros',
  imports: [HeaderComponent, FooterComponent, HistoriaComponent, PartnersComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

}
