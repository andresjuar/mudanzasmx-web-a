import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-contador',
  imports: [],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent implements OnInit, AfterViewInit {
  contador: number = 0;
  clientes: number = 0;
  contadorFormatted: string = '0';
  clientesFormatted: string = '0';
  objetivoContador: number = 8674;
  objetivoClientes: number = 12000;
  velocidad: number = 20; 
  observado: boolean = false; // Para asegurarnos de que solo se active una vez

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.observado) {
          this.iniciarContador();
          this.iniciarClientes();
          this.observado = true; // Evita que la animación se repita
          observer.disconnect(); // Deja de observar una vez activado
        }
      });
    }, { threshold: 0.5 }); // Se activa cuando el 50% del componente es visible

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