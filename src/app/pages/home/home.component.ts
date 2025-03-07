import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";

import { FuncComponent } from "./func/func.component";
import { Heroe2Component } from "./heroe-2/heroe-2.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { PlanesComponent } from "../../shared/planes/planes.component";
import { RouterOutlet } from '@angular/router';
import { ContadorComponent } from './contador/contador.component';
import { WhButtonComponent } from "../../shared/wh-button/wh-button.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FuncComponent, Heroe2Component, PlanesComponent, FooterComponent, ContadorComponent, WhButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
