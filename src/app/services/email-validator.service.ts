import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  private apiUrl = 'https://api.mailgun.net/v4/address/validate'; // API URL de Mailgun
  private apiKey = 'YOUR_API_KEY'; // Sustituye con tu clave API de Mailgun

  constructor() { }

  validateEmail(email: string) {
    const url = `${this.apiUrl}?address=${email}`;

    return axios.get(url, {
      auth: {
        username: 'api',
        password: this.apiKey
      }
    });
  }
}