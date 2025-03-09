import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-quote',
  imports: [FormsModule, CommonModule, QuoteFormComponent, FooterComponent, 
    
  ],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent {
  isQuoteStarted = false; // Estado para mostrar el formulario

  startQuote() {
    this.isQuoteStarted = true;
    console.log(this.isQuoteStarted);
  }
}
