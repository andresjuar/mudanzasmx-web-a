import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quote',
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent {
  currentStep=1;
  totalSteps=10;

  quoteData={
    nombreCliente: null,
    emailCliente:null,
    volumen: null,
    origen:null,
    destino:null,
    tipoOrigen: [null,null,null], // [tipo,pisos,elevador]
    tipoDestino: [null,null,null], // [tipo,pisos,elevador]
    metrosAcarreo: [null,null], //Origen Destino
    empaqueVip: null,
  }
  successMessage: string | null = null;

  constructor(private http: HttpClient) {}

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
        return !!this.quoteData.volumen;
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
        return !!this.quoteData.empaqueVip;
      default:
        return false;
    }
  }
  
}
