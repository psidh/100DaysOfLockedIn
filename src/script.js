const form = document.getElementById("form");
const quoteBox = document.getElementById("quote");
const header = document.getElementById("header");
const pieCanvas = document.getElementById("pie");
const ctx = pieCanvas.getContext("2d");
const title = document.getElementById("titleCard");
const tasksContainer = document.getElementById("tasksContainer");
const extraContainer = document.getElementById("extra-accomplishments");

document.getElementById("card").classList.remove("hidden");
document.getElementById("downloadBtn").classList.remove("hidden");

const quotes = [
  "The power to make and break habits and learning how to do that is really important.",
  "Play long-term games with long-term people.",
  "Escape competition through authenticity.",
  "Impatience with actions, patience with results.",
  "Desire is a contract you make to be unhappy until you get what you want.",
];

function drawPie(day) {
  const percent = (day % 100) / 100;
  const angle = percent * 2 * Math.PI;

  ctx.clearRect(0, 0, pieCanvas.width, pieCanvas.height);

  ctx.fillStyle = "#212121";
  ctx.beginPath();
  ctx.arc(80, 80, 75, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "#00ff00";
  ctx.beginPath();
  ctx.moveTo(80, 80);
  ctx.arc(80, 80, 75, 0, angle);
  ctx.closePath();
  ctx.fill();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const day = parseInt(document.getElementById("day").value);
  const inputs = document.querySelectorAll(".accomplishment");

  tasksContainer.innerHTML = `<div class="text-center text-3xl font-bold mb-4 text-[#00ff00]" id="header">Day ${day}</div>`;

  inputs.forEach((input, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}. ${input.value}`;
    tasksContainer.appendChild(p);
  });

  title.innerHTML = "100 Days of Locked In";
  drawPie(day);

  quoteBox.textContent = `"${
    quotes[Math.floor(Math.random() * quotes.length)]
  }"`;
});

document.getElementById("addBtn").addEventListener("click", () => {
  const count = document.querySelectorAll(".accomplishment").length + 1;
  const wrapper = document.createElement("div");

  wrapper.innerHTML = `
    <label class="block text-sm text-neutral-400 mb-1">Accomplishment #${count}</label>
    <input type="text" class="accomplishment w-full p-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Another thing you achieved" required />
  `;

  extraContainer.appendChild(wrapper);
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const card = document.getElementById("card");
  html2canvas(card).then((canvas) => {
    const link = document.createElement("a");
    link.download = `lockedin-day.png`;
    link.href = canvas.toDataURL();
    link.click();
  });

  gtag("event", "download_button_click", {
    event_category: "engagement",
    event_label: "Download as PNG Button",
  });
});
