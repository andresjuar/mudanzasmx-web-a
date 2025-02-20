import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuoteFormComponent } from './quote-form/quote-form.component';

@Component({
  selector: 'app-quote',
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, QuoteFormComponent],
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
