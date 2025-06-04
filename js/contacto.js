// Asegúrate de inicializar EmailJS con tu User ID
(function() {
  emailjs.init('vtD81N_BpQLTOdc-0'); // Reemplaza con tu User ID de EmailJS
})();

// Agregar el evento al formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevenir el envío predeterminado del formulario

  // Validar captcha
  const captcha = document.getElementById('captcha').value.trim();
  if(captcha !== '5') {
    alert('Respuesta incorrecta en el captcha. Por favor intenta de nuevo.');
    return;
  }

  // Validar honeypot (campo oculto)
  const honeypot = document.getElementById('honeypot').value;
  if(honeypot) {
    // Bot detectado, no enviar
    return;
  }

  // Validar formulario HTML5 (si no está completo, no se envía)
  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }

  // Si todo está correcto, enviamos el formulario a través de EmailJS
  emailjs.sendForm('default_service', 'template_2i6h03n', {
    name: name,
    email: email,
    subject: subject,
    message: message,
  })
    .then(() => {
      alert('Mensaje enviado correctamente. ¡Gracias por contactarnos!');
      this.reset();  // Limpiar el formulario
    }, (error) => {
      alert('Error al enviar el mensaje. Intenta más tarde.');
      console.error('EmailJS error:', error);  // Mostrar error en consola si algo falla
    });
});
