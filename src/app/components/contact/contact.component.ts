import { Component } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  
  notification: { message: string; type: string } | null = null;

  public sendEmail(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    emailjs
      .sendForm('contact_service', 'contact_form', e.target as HTMLFormElement, {
        publicKey: 'Su_kXpXvbwj9SkD_c',
      })
      .then(
        () => {
          this.notification = { message: 'Message sent!', type: 'success' };
          setTimeout(() => (this.notification = null), 4000);
          console.log('SUCCESS!');
        },
        (error) => {
          this.notification = { message: 'Message Failed!', type: 'error' };
          setTimeout(() => (this.notification = null), 4000); 
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      )
      .finally(() => {
        form.reset(); // Limpia los campos del formulario
        setTimeout(() => (this.notification = null), 3000); // Oculta el mensaje después de 3 segundos
      });
  }
}
