const track = document.querySelector(".brands-carousel__track");
const leftArrow = document.querySelector(".brands-carousel__arrow--left");
const rightArrow = document.querySelector(".brands-carousel__arrow--right");

let logos = Array.from(track.children);
const logoWidth = logos[0].offsetWidth + 48; // 48px ≈ gap 3em

function moveCarousel(direction) {
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform =
    direction === "left" ? `translateX(${logoWidth}px)` : `translateX(-${logoWidth}px)`;

  setTimeout(() => {
    track.style.transition = "none";
    track.style.transform = "translateX(0)";

    if (direction === "left") {
      const last = logos.pop();
      logos.unshift(last);
      track.prepend(last);
    } else {
      const first = logos.shift();
      logos.push(first);
      track.append(first);
    }
  }, 500);
}

leftArrow.addEventListener("click", () => moveCarousel("left"));
rightArrow.addEventListener("click", () => moveCarousel("right"));

setInterval(() => moveCarousel("right"), 4000);