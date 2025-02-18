import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-quote',
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent {
  formData = { nombre: '', email: '', direccion: '', destino: '' };
  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('Datos de cotización:', this.formData);
  }
}
