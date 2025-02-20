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
    volumen: [] as { nombre: string; volumen: number; cantidad: number }[],
    VolumenTotal: 0,
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
        { nombre: 'Sofá grande', volumen: 3, cantidad: 1 },
        { nombre: 'Sofá pequeño', volumen: 2, cantidad: 1 },
        { nombre: 'Mesa de centro', volumen: 1, cantidad: 1 },
        { nombre: 'TV', volumen: 0.5, cantidad: 1 },
        { nombre: 'Librero', volumen: 1.8, cantidad: 1 }
      ]
    },
    { 
      nombre: 'Recámara principal', 
      muebles: [
        { nombre: 'Cama King Size', volumen: 4, cantidad: 1 },
        { nombre: 'Closet grande', volumen: 3, cantidad: 1 },
        { nombre: 'Buró', volumen: 0.7, cantidad: 1 },
        { nombre: 'Tocador', volumen: 2, cantidad: 1 },
        { nombre: 'Espejo grande', volumen: 0.5, cantidad: 1 }
      ]
    },
    { 
      nombre: 'Recámara secundaria', 
      muebles: [
        { nombre: 'Cama individual', volumen: 2, cantidad: 1 },
        { nombre: 'Closet pequeño', volumen: 2, cantidad: 1 },
        { nombre: 'Escritorio', volumen: 1.5, cantidad: 1 },
        { nombre: 'Silla de oficina', volumen: 0.8, cantidad: 1 }
      ]
    },
    { 
      nombre: 'Comedor', 
      muebles: [
        { nombre: 'Mesa de comedor', volumen: 2.5, cantidad: 1 },
        { nombre: 'Sillas (6)', volumen: 2, cantidad: 1 },
        { nombre: 'Vitrina', volumen: 2.2, cantidad: 1 }
      ]
    },
    { 
      nombre: 'Cocina', 
      muebles: [
        { nombre: 'Refrigerador', volumen: 3, cantidad: 1 },
        { nombre: 'Estufa', volumen: 1.5, cantidad: 1 },
        { nombre: 'Microondas', volumen: 0.4, cantidad: 1 },
        { nombre: 'Alacena', volumen: 2, cantidad: 1 },
        { nombre: 'Mesa auxiliar', volumen: 1, cantidad: 1 }
      ]
    },
    { 
      nombre: 'Baño', 
      muebles: [
        { nombre: 'Lavadora', volumen: 1.5, cantidad: 1 },
        { nombre: 'Secadora', volumen: 1.5, cantidad: 1 },
        { nombre: 'Mueble de baño', volumen: 1, cantidad: 1 }
      ]
    },
    { 
      nombre: 'Cuarto de servicio', 
      muebles: [
        { nombre: 'Cama individual', volumen: 2, cantidad: 1 },
        { nombre: 'Closet pequeño', volumen: 1.5, cantidad: 1 },
        { nombre: 'Buró', volumen: 0.5, cantidad: 1 }
      ]
    },
    { 
      nombre: 'Oficina/Estudio', 
      muebles: [
        { nombre: 'Escritorio grande', volumen: 2, cantidad: 1 },
        { nombre: 'Silla ergonómica', volumen: 0.8, cantidad: 1 },
        { nombre: 'Librero', volumen: 2, cantidad: 1 },
        { nombre: 'Computadora', volumen: 0.3, cantidad: 1 }
      ]
    },
    { 
      nombre: 'Objetos varios', 
      muebles: [
        { nombre: 'Bicicleta', volumen: 1.5, cantidad: 1 },
        { nombre: 'Parrilla de asador', volumen: 1.2, cantidad: 1 },
        { nombre: 'Caja de herramientas', volumen: 0.8, cantidad: 1 },
        { nombre: 'Maletas (3)', volumen: 1.5, cantidad: 1 },
        { nombre: 'Árbol de Navidad', volumen: 2, cantidad: 1 }
      ]
    },
    { 
      nombre: 'Cajas y bultos', 
      muebles: [
        { nombre: 'Caja pequeña', volumen: 0.5, cantidad: 1 },
        { nombre: 'Caja mediana', volumen: 1, cantidad: 1 },
        { nombre: 'Caja grande', volumen: 1.5, cantidad: 1 },
        { nombre: 'Bulto de ropa pequeño', volumen: 0.7, cantidad: 1 },
        { nombre: 'Bulto de ropa grande', volumen: 1.2, cantidad: 1 }
      ]
    }
  ];


  

constructor(private http: HttpClient) {}

habitacionAbierta: string | null = null;

toggleHabitacion(nombre: string) {
  this.habitacionAbierta = this.habitacionAbierta === nombre ? null : nombre;
}
getMueblesDeHabitacion(nombre: string) {
  return this.habitaciones.find(h => h.nombre === nombre)?.muebles || [];
}

agregarMueble(mueble: { nombre: string; volumen: number }) {
  const existente = this.quoteData.volumen.find(item => item.nombre === mueble.nombre);

  if (existente) {
    existente.cantidad++; // Si ya existe, aumenta la cantidad
  } else {
    this.quoteData.volumen.push({ ...mueble, cantidad: 1 }); // Si es nuevo, agrégalo con cantidad = 1
  }

  this.calcularVolumenTotal();
}


eliminarMueble(index: number) {
  if (this.quoteData.volumen[index].cantidad > 1) {
    this.quoteData.volumen[index].cantidad--; // Reduce la cantidad
  } else {
    this.quoteData.volumen.splice(index, 1); // Si solo hay 1, eliminar el objeto
  }

  this.calcularVolumenTotal();
}
calcularVolumenTotal() {
  this.quoteData.VolumenTotal = this.quoteData.volumen.reduce(
    (acc, item) => acc + item.volumen * item.cantidad,
    0
  );
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
        return this.quoteData.VolumenTotal > 0; // Debe haber al menos un objeto seleccionado
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
