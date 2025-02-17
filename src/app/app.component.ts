import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./pages/home/header/header.component";
import { HeroComponent } from "./pages/home/hero/hero.component";
import { FuncComponent } from "./pages/home/func/func.component";
import { Heroe2Component } from "./pages/home/heroe-2/heroe-2.component";
import { FooterComponent } from "./pages/home/footer/footer.component";
import { PlanesComponent } from "./pages/home/planes/planes.component";
import { HomeComponent } from "./pages/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HeroComponent, FuncComponent, Heroe2Component, FooterComponent, PlanesComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mudanzasmx-web-a';
}
