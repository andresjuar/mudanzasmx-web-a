import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';


@Component({
  selector: 'app-contacto',
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  name = '';
  email = '';
  message = '';
  successMessage = '';
  isSending: boolean = false;
  emailSent: boolean = false;
  cooldownTime: number = 5*60*1000;

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    const lastSentTime = localStorage.getItem('lastSentTime');
    if (lastSentTime) {
      const elapsedTime = Date.now() - parseInt(lastSentTime, 10);
      if (elapsedTime < this.cooldownTime) {
        this.emailSent = true; // ✅ Mantiene oculto el formulario si aún no pasa el cooldown
      }
    }
  }

  sendEmail() {
    if (this.isSending) return; // Si ya está enviando, salir

    this.isSending = true;
    const emailData = {
      name: this.name,
      email: this.email,
      message: this.message,
    };

    this.emailService.sendEmail(emailData).subscribe({
      next: () => {
        this.emailSent = true;
        this.successMessage = 'Correo enviado con éxito';
        this.isSending = false;
    
      },
      error: (error) => {
        console.error('Error enviando correo:', error);
        this.isSending = false;
      },
    });
  }

}

