document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Validar captcha
  const captcha = document.getElementById('captcha').value.trim();
  if(captcha !== '5') {
    alert('Respuesta incorrecta en el captcha. Por favor intenta de nuevo.');
    return;
  }

  // Validar honeypot
  const honeypot = document.getElementById('honeypot').value;
  if(honeypot) {
    // Bot detectado, no enviar
    return;
  }

  // Validar formulario HTML5
  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }

  // Si todo ok, enviar por EmailJS
  emailjs.sendForm('service_647hnei', 'template_r3g8mqb', this) // Aquí se ponen los IDs correctos
    .then(() => {
      alert('Mensaje enviado correctamente. ¡Gracias por contactarnos!');
      this.reset();
    }, (error) => {
      alert('Error al enviar el mensaje. Intenta más tarde.');
      console.error('EmailJS error:', error);
    });
});
