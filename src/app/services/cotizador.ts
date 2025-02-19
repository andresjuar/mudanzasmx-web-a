import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  private cotizacionData: any = {};

  private apiUrl = 'http://localhost:3000/send-email'; // URL del backend
  
  constructor(private http: HttpClient) {}


  // Guardar datos en el objeto de cotización
  setCotizacionData(step: string, data: any) {
    this.cotizacionData[step] = data;
  }

  // Obtener los datos almacenados
  getCotizacionData() {
    return this.cotizacionData;
  }

  // Enviar la cotización al backend
  sendCotizacion() {
    // Aquí harías una petición HTTP a /quote con this.cotizacionData
    // Ejemplo:
    console.log('Enviando cotización:', this.cotizacionData);
    return this.http.post('/quote', this.cotizacionData);
  }
}
