document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.coffee-machines__carousel-track');
    const items = document.querySelectorAll('.coffee-machines__carousel-item');
    const btnPrev = document.querySelector('.coffee-machines__carousel-nav--prev');
    const btnNext = document.querySelector('.coffee-machines__carousel-nav--next');

    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 20; // Element width + gap
    let isScrollingRight = true;
    let autoScrollInterval;

    function cloneItems() {
      const itemsToClone = Array.from(items).slice(0, 5);
      itemsToClone.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
      });
    }

    function moveToIndex(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

      if (currentIndex >= items.length) {
        setTimeout(() => {
          track.style.transition = 'none';
          currentIndex = 0;
          track.style.transform = 'translateX(0)';
          setTimeout(() => {
            track.style.transition = 'transform 0.5s ease';
          }, 50);
        }, 500);
      } else if (currentIndex < 0) {
        setTimeout(() => {
          track.style.transition = 'none';
          currentIndex = items.length - 1;
          track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
          setTimeout(() => {
            track.style.transition = 'transform 0.5s ease';
          }, 50);
        }, 500);
      }
    }

    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        if (isScrollingRight) {
          moveToIndex(currentIndex + 1);
          if (currentIndex >= items.length - 3) {
            isScrollingRight = false;
          }
        } else {
          moveToIndex(currentIndex - 1);
          if (currentIndex <= 1) {
            isScrollingRight = true;
          }
        }
      }, 3000);
    }

    cloneItems();
    startAutoScroll();

    btnNext.addEventListener('click', () => {
      clearInterval(autoScrollInterval);
      isScrollingRight = true;
      moveToIndex(currentIndex + 1);
      startAutoScroll();
    });

    btnPrev.addEventListener('click', () => {
      clearInterval(autoScrollInterval);
      isScrollingRight = false;
      moveToIndex(currentIndex - 1);
      startAutoScroll();
    });

    track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    track.addEventListener('mouseleave', startAutoScroll);
  });