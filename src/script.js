const form = document.getElementById('form');
const quoteBox = document.getElementById('quote');
const header = document.getElementById('header');
const pieCanvas = document.getElementById('pie');
const ctx = pieCanvas.getContext('2d');
const taskLine1 = document.getElementById('taskLine1');
const taskLine2 = document.getElementById('taskLine2');
const taskLine3 = document.getElementById('taskLine3');
document.getElementById('card').classList.remove('hidden');
document.getElementById('downloadBtn').classList.remove('hidden');

const quotes = [
  'The power to make and break habits and learning how to do that is really important.',
  'Play long-term games with long-term people.',
  'Escape competition through authenticity.',
  'Impatience with actions, patience with results.',
  'Desire is a contract you make to be unhappy until you get what you want.',
];

function drawPie(day) {
  const percent = (day % 100) / 100;
  const angle = percent * 2 * Math.PI;

  ctx.clearRect(0, 0, pieCanvas.width, pieCanvas.height);

  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.arc(80, 80, 75, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = '#00ff00';
  ctx.beginPath();
  ctx.moveTo(80, 80);
  ctx.arc(80, 80, 75, 0, angle);
  ctx.closePath();
  ctx.fill();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const day = parseInt(document.getElementById('day').value);
  const task1 = document.getElementById('task1').value;
  const task2 = document.getElementById('task2').value;
  const task3 = document.getElementById('task3').value;
  const title = document.getElementById('titleCard');

  title.innerHTML = '100 Days of Locked In';

  header.innerHTML = `Day ${day}`;
  drawPie(day);
  taskLine1.textContent = `1. ${task1}`;
  taskLine2.textContent = `2. ${task2}`;
  taskLine3.textContent = `3. ${task3}`;
  quoteBox.textContent = `"${
    quotes[Math.floor(Math.random() * quotes.length)]
  }"`;
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const card = document.getElementById('card');
  html2canvas(card).then((canvas) => {
    const link = document.createElement('a');
    link.download = `lockedin-day.png`;
    link.href = canvas.toDataURL();
    link.click();
  });
});
