const particlesWrap = document.querySelector('.particles');
const petalsWrap = document.querySelector('.petals');

function createParticles(count = 22) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'particle';
    const size = (Math.random() * 4 + 3).toFixed(2);
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${16 + Math.random() * 20}s`;
    el.style.animationDelay = `${-Math.random() * 20}s`;
    el.style.opacity = `${0.2 + Math.random() * 0.35}`;
    particlesWrap.appendChild(el);
  }
}

function createPetals(count = 16) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'petal';
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${18 + Math.random() * 18}s`;
    el.style.animationDelay = `${-Math.random() * 26}s`;
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    petalsWrap.appendChild(el);
  }
}

function startCountdown() {
  const targetDate = new Date('2026-10-17T10:00:00-03:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const gridEl = document.getElementById('countdownGrid');
  const doneEl = document.getElementById('countdownFinished');

  const pad = (n) => String(n).padStart(2, '0');

  function update() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      gridEl.hidden = true;
      doneEl.hidden = false;
      clearInterval(timer);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  update();
  const timer = setInterval(update, 1000);
}

// Modal de confirmação de presença
function initConfirmModal() {
  const confirmBtn = document.getElementById('confirmBtn');
  const modal = document.getElementById('confirmModal');
  const closeBtn = document.getElementById('closeBtn');
  const confirmForm = document.getElementById('confirmForm');
  const dietaryCheckbox = document.getElementById('dietary');
  const dietaryDetails = document.getElementById('dietaryDetails');
  const successMessage = document.getElementById('successMessage');

  // Abrir modal
  confirmBtn.addEventListener('click', () => {
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  });

  // Fechar modal
  const closeModal = () => {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);

  // Fechar ao clicar no overlay
  const modalOverlay = modal.querySelector('.modal-overlay');
  modalOverlay.addEventListener('click', closeModal);

  // Mostrar/ocultar campo de restrição alimentar
  dietaryCheckbox.addEventListener('change', () => {
    if (dietaryCheckbox.checked) {
      dietaryDetails.removeAttribute('hidden');
    } else {
      dietaryDetails.setAttribute('hidden', '');
    }
  });

  // Enviar formulário
  confirmForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Coletar dados
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      guests: document.getElementById('guests').value,
      dietary: dietaryCheckbox.checked,
      dietaryText: document.getElementById('dietaryText').value,
      timestamp: new Date().toISOString()
    };

    // Salvar no localStorage
    const confirmations = JSON.parse(localStorage.getItem('weddingConfirmations') || '[]');
    confirmations.push(formData);
    localStorage.setItem('weddingConfirmations', JSON.stringify(confirmations));

    // Mostrar mensagem de sucesso
    confirmForm.style.display = 'none';
    successMessage.removeAttribute('hidden');

    // Fechar modal após 2 segundos
    setTimeout(() => {
      closeModal();
      // Resetar form
      confirmForm.style.display = '';
      confirmForm.reset();
      successMessage.setAttribute('hidden', '');
      dietaryDetails.setAttribute('hidden', '');
    }, 2000);
  });
}

createParticles();
createPetals();
startCountdown();
initConfirmModal();

requestAnimationFrame(() => {
  document.body.classList.add('ready');
});
