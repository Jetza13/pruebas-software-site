(function(){
  const root = document.documentElement;
  const panel = document.getElementById('accessibility-panel');
  const toggleBtn = document.getElementById('toggle-accessibility');

  const settings = JSON.parse(localStorage.getItem('a11y')) || {
    fontSize: 1,
    theme: 'light',
    family: 'montserrat', // o 'serif'
    contrast: false,
    showImages: true,
    showLinks: true,
    cursor: 'auto',
    highlightLinks: false,
    daltonismFilter: 'none' // puede ser 'none', 'protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'
  };

  function apply() {
    root.style.setProperty('--font-size', settings.fontSize + 'rem');
    if (settings.family === 'montserrat') {
      root.classList.remove('serif');
      root.style.setProperty('--font-family', "'Montserrat', 'Segoe UI', Tahoma, sans-serif");
    } else {
      root.classList.add('serif');
      root.style.setProperty('--font-family', "Georgia, serif");
    }
    root.setAttribute('data-theme', settings.theme);

    if(settings.contrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    if(settings.highlightLinks) {
      document.body.classList.add('highlight-links');
    } else {
      document.body.classList.remove('highlight-links');
    }

    document.body.classList.remove(
      'filter-protanopia',
      'filter-deuteranopia',
      'filter-tritanopia',
      'filter-achromatopsia'
    );

    if(settings.daltonismFilter && settings.daltonismFilter !== 'none'){
      document.body.classList.add(`filter-${settings.daltonismFilter}`);
    }

    document.body.style.cursor = settings.cursor;
    document.querySelectorAll('img').forEach(img => img.style.display = settings.showImages ? '' : 'none');
    if(settings.showLinks) {
      document.body.classList.remove('no-link-style');
    } else {
      document.body.classList.add('no-link-style');
    }
  }

  function save() {
    localStorage.setItem('a11y', JSON.stringify(settings));
  }

  function button(label, onClick) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.type = 'button';
    btn.addEventListener('click', onClick);
    panel.appendChild(btn);
  }

  function togglePanel() {
    panel.classList.toggle('hidden');
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    panel.innerHTML = '';

    button('A+', ()=>{ 
      settings.fontSize = Math.min(settings.fontSize + 0.25, 3);
      apply(); save(); 
    });
    button('A-', ()=>{ 
      settings.fontSize = Math.max(settings.fontSize - 0.25, 0.5);
      apply(); save(); 
    });

    button('Montserrat', ()=>{ 
      settings.family = 'montserrat';
      apply(); save(); 
    });
    button('Serif', ()=>{ 
      settings.family = 'serif';
      apply(); save(); 
    });

    button('🌙', ()=>{ 
      settings.theme = (settings.theme === 'light') ? 'dark' : 'light';
      apply(); save(); 
    });

    button('C+', ()=>{ 
      settings.contrast = !settings.contrast;
      apply(); save(); 
    });

    button('🖱️', ()=>{ 
      settings.cursor = (settings.cursor === 'auto') ? 'pointer' : 'auto';
      apply(); save(); 
    });

    button('🖼️', ()=>{ 
      settings.showImages = !settings.showImages;
      apply(); save(); 
    });

    button('🔗', ()=>{ 
      settings.showLinks = !settings.showLinks;
      apply(); save(); 
    });

    button('Restablecer', () => {
      settings.fontSize = 1;
      settings.theme = 'light';
      settings.family = 'montserrat';
      settings.contrast = false;
      settings.showImages = true;
      settings.showLinks = true;
      settings.cursor = 'auto';
      settings.highlightLinks = false;
      settings.daltonismFilter = 'none';
      apply();
      save();
    });

    button('Resaltar links', () => {
      settings.highlightLinks = !settings.highlightLinks;
      apply();
      save();
    });

    button('Daltonismo: Ninguno', () => {
      settings.daltonismFilter = 'none';
      apply();
      save();
    });
    button('Daltonismo: Protanopía', () => {
      settings.daltonismFilter = 'protanopia';
      apply();
      save();
    });
    button('Daltonismo: Deuteranopía', () => {
      settings.daltonismFilter = 'deuteranopia';
      apply();
      save();
    });
    button('Daltonismo: Tritanopía', () => {
      settings.daltonismFilter = 'tritanopia';
      apply();
      save();
    });
    button('Daltonismo: Monocromático', () => {
      settings.daltonismFilter = 'achromatopsia';
      apply();
      save();
    });

    apply();

    if(toggleBtn){
      toggleBtn.addEventListener('click', togglePanel);
    }
  });
})();
