const canvas = document.getElementById("canvas");
const stones = document.getElementById("stones");
const person = document.getElementById("person");
const mountains = document.getElementById("mountains");
const background = document.getElementById("background");
const heading = document.getElementById("heading");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  stones.style.transform = `translateY(${scrollY}px)`;
  person.style.transform = `translateY(${0.7 * scrollY}px)`;
  mountains.style.transform = `translateY(${0.3 * scrollY}px)`;
  heading.style.transform = `translateY(${-0.7 * scrollY}px) translateX(-50%)`;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let circles = [];
const amountOfParticles = 50;
const radiusScaler = 1.2;
const yScaler = 5;
const xScaler = 2;
const colorScaler = 0.8;
const minColorValue = 0.2;
const minX = 2;

window.addEventListener("resize", () => {
  init();
});

class Circle {
  constructor(x, y, dx, dy, r, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  update() {
    if (this.x + this.r >= canvas.width || this.x < this.r) {
      this.x = Math.random() * canvas.width * 0.6;
      this.y = -Math.random() * canvas.height * 0.2;
    }

    if (this.y > canvas.height - this.r) {
      this.x = Math.random() * canvas.width * 0.6;
      this.y = -Math.random() * canvas.height * 0.2;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

const init = () => {
  circles = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < amountOfParticles; i++) {
    const randomR = Math.random() * radiusScaler;
    const randomX = Math.random() * canvas.width;
    const randomY = Math.random() * canvas.height;
    const randomXSpeed = Math.random() * xScaler + minX;
    const randomYSpeed = Math.random() * yScaler;
    const randomColor = `rgba(255, 255, 255, ${Math.random() - Math.random() * colorScaler + minColorValue})`;
    circles.push(
      new Circle(
        randomX,
        randomY,
        randomXSpeed,
        randomYSpeed,
        randomR,
        randomColor,
      ),
    );
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => {
    circle.update();
    circle.draw();
  });
};

init();
animate();
