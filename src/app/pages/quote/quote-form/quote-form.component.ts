import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-quote-form',
  imports: [FormsModule, CommonModule,HeaderComponent],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css'
})
export class QuoteFormComponent {
  currentStep = 0;
  totalSteps = 11;
  private apiUrl = 'http://localhost:3000/quote';
  successMessage: string | null = null;

  folio: string | null = null;
  folioC: string | null = null;
  folioLetra: string | null = null;
  directoPrecio: string | null = null;
  directoUSAPrecio: string | null = null;
  compartidoPrecio: string | null = null;
  directoTiempo: string | null = null;
  directoUSATiempo: string | null = null;
  compartidoTiempo: string | null = null;
  distancia: string | null = null;
  mensajeWhatsAppDirecto: string = '';
  mensajeWhatsAppCompartido: string = '';
  mensajeWhatsAppUSA: string = '';
  
  volumenTotal: number = 0;

  quoteData = {
    tipoMudanza: null,
    nombreCliente: [null,null], //nombre apellido
    contactoCliente: [null,null], //email numero
    volumen: [] as { nombre: string; volumen: number; cantidad: number }[],
    VolumenTotal: 0,
    origen: [null,null,null,null,null], //calle y numero, ciudad, estado, pais, código postal
    destino: [null,null,null,null,null], //calle y numero, ciudad, estado, pais, código postal
    tipoOrigen: ['', null, false], // [tipo, pisos, elevador]
    tipoDestino: ['', 1, false], // [tipo, pisos, elevador]
    metrosAcarreo: [null, null], // [Origen, Destino]
    empaque: '',
    seguro:''
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
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isValidStep(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.quoteData.tipoMudanza !== null;
      case 1:
        return !!this.quoteData.nombreCliente.every(value=>value !==null);
      case 2:
        return !!this.quoteData.contactoCliente.every(value=>value !==null);
      case 3:
        return this.quoteData.VolumenTotal > 0; // Debe haber al menos un objeto seleccionado
      case 4:
        return !!this.quoteData.origen.every(value=>value !==null) && !!this.quoteData.destino.every(value=>value !==null);;

      case 5:
        return this.quoteData.tipoOrigen[1] !== null;
      case 6:
        return this.quoteData.tipoDestino[1] !== null;
      case 7:
        return this.quoteData.metrosAcarreo.every(value => value !== null);
      case 8:
        return this.quoteData.empaque !== null;
      case 9:
        return this.quoteData.seguro !== null;
      default:
        return false;
    }}
  

  seleccionarEmpaque(tipo: string) {
    this.quoteData.empaque = tipo; // Guarda la opción seleccionada
    this.currentStep++; // Avanza al siguiente paso automáticamente
  }
  seleccionarTipoMudanza(tipo: string) {
    this.quoteData.empaque = tipo; // Guarda la opción seleccionada
    this.currentStep++; // Avanza al siguiente paso automáticamente
  }

  seleccionarSeguro(tipo: string) {
    this.quoteData.seguro = tipo; // Guarda la opción seleccionada
    this.currentStep++; // Avanza al siguiente paso automáticamente
  }



  submitQuote() {
    this.currentStep++; 
    console.log(this.quoteData);
    this.http.post(this.apiUrl, this.quoteData).subscribe(
      (response: any) => {
    
        this.folio = response.folio[1];
        this.folioLetra = response.folio[0];

        this.folioC  = `${this.folioLetra}${this.folio}`

        this.mensajeWhatsAppDirecto = `https://api.whatsapp.com/send?phone=5215618953849&text=Hola! Hice mi cotización en mudanzasmx.com, me interesa reservar mi mudanza con el folio: ${this.folioC} en el servicio: Plan Exlusivo 🚚`;
        this.mensajeWhatsAppCompartido = `https://api.whatsapp.com/send?phone=5215618953849&text=Hola! Hice mi cotización en mudanzasmx.com, me interesa reservar mi mudanza con el folio: ${this.folioC} en el servicio: Plan Flex Compartido 🚚`;
        this.mensajeWhatsAppUSA = `https://api.whatsapp.com/send?phone=5215618953849&text=Hola! Hice mi cotización en mudanzasmx.com, me interesa reservar mi mudanza con el folio: ${this.folioC} en el servicio: Plan Directo USA 🚚`;


        this.directoPrecio=response.paquetes.directo.precio;
        this.compartidoPrecio=response.paquetes.compartido.precio;
        this.directoUSAPrecio=response.paquetes.DirectoUSA.precio;
        
        this.directoTiempo=response.paquetes.directo.tiempoEntrega;
        this.compartidoTiempo=response.paquetes.compartido.tiempoEntrega;
        this.directoUSATiempo=response.paquetes.DirectoUSA.tiempoEntrega;

        this.distancia=response.distancia

        console.log(response);
      },
      (error) => {
        console.error('Error al enviar la cotización', error);
      }
    );
  }
}
