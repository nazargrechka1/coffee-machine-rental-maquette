document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".coffee-catalog__track");
  const items = document.querySelectorAll(".coffee-catalog__item");
  const prevBtn = document.querySelector(".coffee-catalog__nav--prev");
  const nextBtn = document.querySelector(".coffee-catalog__nav--next");

  const visibleItems = 3; // скільки карток видно одночасно
  const itemWidth = items[0].offsetWidth + 20; // ширина + відступ
  let index = visibleItems; // старт з першого «справжнього» елемента

  // 🔹 Клонування для безкінечності
  items.forEach(item => {
    const cloneFirst = item.cloneNode(true);
    const cloneLast = item.cloneNode(true);
    track.appendChild(cloneFirst);
    track.insertBefore(cloneLast, track.firstChild);
  });

  const allItems = document.querySelectorAll(".coffee-catalog__item");
  track.style.transform = `translateX(-${index * itemWidth}px)`;

  function moveToIndex() {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  function jumpToIndex() {
    track.style.transition = "none";
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    index++;
    moveToIndex();
  });

  prevBtn.addEventListener("click", () => {
    index--;
    moveToIndex();
  });

  track.addEventListener("transitionend", () => {
    if (index >= allItems.length - visibleItems) {
      index = visibleItems;
      jumpToIndex();
    }
    if (index <= 0) {
      index = allItems.length - visibleItems * 2;
      jumpToIndex();
    }
  });
});
