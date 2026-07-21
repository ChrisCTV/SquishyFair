const slides = [...document.querySelectorAll('.slide')];
const progress = [...document.querySelectorAll('.progress-segment')];
const journeyLabel = document.getElementById('journeyLabel');
const continueButton = document.getElementById('continueButton');
const backButton = document.querySelector('.back-button');
const skipButton = document.querySelector('.skip-button');
const welcomeScreen = document.querySelector('.welcome-screen');
const restartButton = document.getElementById('restartButton');

let currentStep = 0;

function renderStep(step) {
  currentStep = Math.max(0, Math.min(step, slides.length - 1));

  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentStep);
  });

  progress.forEach((segment, index) => {
    segment.classList.toggle('active', index === currentStep);
    segment.classList.toggle('complete', index < currentStep);
    segment.setAttribute('aria-current', index === currentStep ? 'step' : 'false');
  });

  journeyLabel.textContent = slides[currentStep].dataset.title;
  continueButton.textContent = currentStep === slides.length - 1 ? 'Enter Squishy Fair' : 'Continue';
  backButton.style.opacity = currentStep === 0 ? '0.35' : '1';
  backButton.disabled = currentStep === 0;
  skipButton.style.visibility = currentStep === slides.length - 1 ? 'hidden' : 'visible';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function enterApp() {
  welcomeScreen.classList.add('visible');
  welcomeScreen.setAttribute('aria-hidden', 'false');
  restartButton.focus();
}

continueButton.addEventListener('click', () => {
  if (currentStep < slides.length - 1) {
    renderStep(currentStep + 1);
  } else {
    enterApp();
  }
});

backButton.addEventListener('click', () => renderStep(currentStep - 1));
skipButton.addEventListener('click', () => renderStep(slides.length - 1));

progress.forEach((segment) => {
  segment.addEventListener('click', () => renderStep(Number(segment.dataset.step)));
});

restartButton.addEventListener('click', () => {
  welcomeScreen.classList.remove('visible');
  welcomeScreen.setAttribute('aria-hidden', 'true');
  renderStep(0);
  continueButton.focus();
});

let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
  const distance = touchEndX - touchStartX;
  if (Math.abs(distance) < 55) return;
  if (distance < 0 && currentStep < slides.length - 1) renderStep(currentStep + 1);
  if (distance > 0 && currentStep > 0) renderStep(currentStep - 1);
}

document.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

document.addEventListener('keydown', (event) => {
  if (welcomeScreen.classList.contains('visible')) return;
  if (event.key === 'ArrowRight') {
    currentStep === slides.length - 1 ? enterApp() : renderStep(currentStep + 1);
  }
  if (event.key === 'ArrowLeft' && currentStep > 0) renderStep(currentStep - 1);
});

renderStep(0);
