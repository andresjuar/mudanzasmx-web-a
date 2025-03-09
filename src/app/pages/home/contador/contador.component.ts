import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-contador',
  imports: [CommonModule],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent implements OnInit, AfterViewInit {
  contador: number = 5674;
  clientes: number = 9000;
  contadorFormatted: string = '0';
  clientesFormatted: string = '0';
  objetivoContador: number = 8674;
  objetivoClientes: number = 12323;
  velocidad: number = 20; 
  observado: boolean = false; 
  visible: boolean = false; // Nueva propiedad para controlar la visibilidad

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.observado) {
          this.visible = true; // Hace que la clase 'visible' se aplique en el HTML
          this.iniciarContador();
          this.iniciarClientes();
          this.observado = true;
          observer.disconnect(); 
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.elementRef.nativeElement);
  }

  iniciarContador() {
    const incremento = Math.ceil(this.objetivoContador / 150);
    const intervalo = setInterval(() => {
      this.contador += incremento;
      this.contadorFormatted = this.contador.toLocaleString();

      if (this.contador >= this.objetivoContador) {
        this.contador = this.objetivoContador;
        this.contadorFormatted = this.contador.toLocaleString();
        clearInterval(intervalo);
      }
    }, this.velocidad);
  }

  iniciarClientes() {
    const incremento = Math.ceil(this.objetivoClientes / 150);
    const intervalo = setInterval(() => {
      this.clientes += incremento;
      this.clientesFormatted = this.clientes.toLocaleString();

      if (this.clientes >= this.objetivoClientes) {
        this.clientes = this.objetivoClientes;
        this.clientesFormatted = this.clientes.toLocaleString();
        clearInterval(intervalo);
      }
    }, this.velocidad);
  }
}