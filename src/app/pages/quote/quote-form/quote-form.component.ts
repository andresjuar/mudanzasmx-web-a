import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quote-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css'
})
export class QuoteFormComponent {
  currentStep = 1;
  totalSteps = 10;
  private apiUrl = 'http://localhost:3000/quote';
  successMessage: string | null = null;
  volumenTotal: number = 0;

  quoteData = {
    nombreCliente: null,
    emailCliente: null,
    volumen: [] as { nombre: string; volumen: number }[],
    origen: null,
    destino: null,
    tipoOrigen: [null, null, null], // [tipo, pisos, elevador]
    tipoDestino: [null, null, null], // [tipo, pisos, elevador]
    metrosAcarreo: [null, null], // [Origen, Destino]
    empaqueVip: null,
  };

  habitaciones = [
    { 
      nombre: 'Sala', 
      muebles: [
        { nombre: 'Sofá', volumen: 2 },
        { nombre: 'Mesa de centro', volumen: 1 },
        { nombre: 'TV', volumen: 0.5 }
      ]
    },
    { 
      nombre: 'Recámara', 
      muebles: [
        { nombre: 'Cama', volumen: 3 },
        { nombre: 'Closet', volumen: 2 },
        { nombre: 'Buró', volumen: 0.7 }
      ]
    },
    { 
      nombre: 'Cocina', 
      muebles: [
        { nombre: 'Refrigerador', volumen: 3 },
        { nombre: 'Estufa', volumen: 1.5 },
        { nombre: 'Microondas', volumen: 0.4 }
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  agregarMueble(mueble: { nombre: string; volumen: number }) {
    this.quoteData.volumen.push(mueble);
    this.calcularVolumenTotal();
  }

  eliminarMueble(index: number) {
    this.quoteData.volumen.splice(index, 1);
    this.calcularVolumenTotal();
  }

  calcularVolumenTotal() {
    this.volumenTotal = this.quoteData.volumen.reduce((acc, item) => acc + item.volumen, 0);
  }

  nextStep() {
    if (this.isValidStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    } else {
      alert('Completa los campos antes de continuar.');
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isValidStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!this.quoteData.nombreCliente;
      case 2:
        return !!this.quoteData.emailCliente;
      case 3:
        return this.volumenTotal > 0; // Debe haber al menos un objeto seleccionado
      case 4:
        return !!this.quoteData.origen;
      case 5:
        return !!this.quoteData.destino;
      case 6:
        return this.quoteData.tipoOrigen.every(value => value !== null);
      case 7:
        return this.quoteData.tipoDestino.every(value => value !== null);
      case 8:
        return this.quoteData.metrosAcarreo.every(value => value !== null);
      case 9:
        return this.quoteData.empaqueVip !== null;
      default:
        return false;
    }
  }

  submitQuote() {
    console.log(this.quoteData);
    this.http.post(this.apiUrl, this.quoteData).subscribe(
      (response: any) => {
        this.successMessage = response.estimatedPrice;
        console.log(response);
      },
      (error) => {
        console.error('Error al enviar la cotización', error);
      }
    );
  }
}
