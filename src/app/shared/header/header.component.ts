import { Component,HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  ngOnInit() {
    window.addEventListener('scroll', this.onScroll);
  }

  onScroll = (): void => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 1) {
      navbar?.classList.add('scrolled'); // Agrega la clase si el usuario scrollea más de 100px
    } else {
      navbar?.classList.remove('scrolled'); // Remueve la clase si está arriba
    }
  }
}
