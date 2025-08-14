document.addEventListener('DOMContentLoaded', function() {
  // Дані для каруселі (можна замінити на динамічне завантаження)
  const products = [
    {
      id: 1,
      name: "FROST Coffee Machine",
      price: "199,00 USD",
      image: "img/coffee3.jpg",
      description: "Professional machine for home use"
    },
    // Додайте інші продукти тут
  ];

  const track = document.querySelector('.coffee-catalog__track');
  const prevBtn = document.querySelector('.coffee-catalog__nav--prev');
  const nextBtn = document.querySelector('.coffee-catalog__nav--next');
  
  if (!track || !prevBtn || !nextBtn) {
    console.error('Carousel elements not found');
    return;
  }

  // Створення карток
  products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'coffee-catalog__item';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="coffee-catalog__image"/>
      <h3 class="coffee-catalog__name">${product.name}</h3>
      <p class="coffee-catalog__price">${product.price}</p>
      <button class="coffee-catalog__btn-add">Add to Cart</button>
    `;
    track.appendChild(item);
  });

  // Клонуємо перші 3 картки для безкінечної прокрутки
  const items = document.querySelectorAll('.coffee-catalog__item');
  for (let i = 0; i < 3; i++) {
    if (items[i]) {
      const clone = items[i].cloneNode(true);
      track.appendChild(clone);
    }
  }

  const allItems = document.querySelectorAll('.coffee-catalog__item');
  let currentPosition = 0;
  const visibleItems = 4;
  let isAnimating = false;
  let startX = 0;
  let isDragging = false;

  function updateCarousel() {
    const itemWidth = allItems[0].offsetWidth + 24; // width + gap
    track.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
    track.style.transition = isAnimating ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
  }

  function handleNext() {
    if (isAnimating) return;
    isAnimating = true;
    currentPosition++;
    
    // Якщо досягли кінця - плавно переходимо на початок
    if (currentPosition > products.length) {
      setTimeout(() => {
        track.style.transition = 'none';
        currentPosition = 0;
        updateCarousel();
      }, 600);
    }
    
    updateCarousel();
    setTimeout(() => isAnimating = false, 600);
  }

  function handlePrev() {
    if (isAnimating) return;
    isAnimating = true;
    currentPosition--;
    
    // Якщо досягли початку - переходимо в кінець
    if (currentPosition < 0) {
      currentPosition = products.length;
      setTimeout(() => {
        track.style.transition = 'none';
        updateCarousel();
        currentPosition = products.length - 1;
        setTimeout(updateCarousel, 50);
      }, 600);
    }
    
    updateCarousel();
    setTimeout(() => isAnimating = false, 600);
  }

  // Обробники кнопок
  nextBtn.addEventListener('click', handleNext);
  prevBtn.addEventListener('click', handlePrev);

  // Touch events для мобільних пристроїв
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.cursor = 'grabbing';
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const diff = startX - x;
    if (Math.abs(diff) > 50) {
      isDragging = false;
      diff > 0 ? handleNext() : handlePrev();
    }
  });

  track.addEventListener('touchend', () => {
    isDragging = false;
    track.style.cursor = 'grab';
  });

  // Ініціалізація
  updateCarousel();

  // Автоматична прокрутка
  let autoScroll = setInterval(handleNext, 5000);
  
  // Пауза при наведенні
  track.addEventListener('mouseenter', () => clearInterval(autoScroll));
  track.addEventListener('mouseleave', () => {
    autoScroll = setInterval(handleNext, 5000);
  });

  // Адаптація при зміні розміру
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    updateCarousel();
    setTimeout(() => {
      track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }, 100);
  });
});