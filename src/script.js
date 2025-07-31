const form = document.getElementById("form");
const quoteBox = document.getElementById("quote");
const header = document.getElementById("header");
const pieCanvas = document.getElementById("pie");
const ctx = pieCanvas.getContext("2d");
const title = document.getElementById("titleCard");
const tasksContainer = document.getElementById("tasksContainer");
const extraContainer = document.getElementById("extra-accomplishments");
const writingLastInput = false;

document.getElementById("card").classList.remove("hidden");
document.getElementById("downloadBtn").classList.remove("hidden");

const quotes = [
  "The power to make and break habits and learning how to do that is really important.",
  "Play long-term games with long-term people.",
  "Escape competition through authenticity.",
  "Impatience with actions, patience with results.",
  "Desire is a contract you make to be unhappy until you get what you want.",
];

function inputAccomplishment(required) {
  const card = document.createElement('div');
  const id = Math.floor(Math.random() * 1000);
  card.innerHTML = `
        <label for=${id} class="block inputLabel text-sm text-neutral-400 mb-1">${required ? "Add Accomplishment:" : `Accomplishment #`}</label>
        <input id=${id} type="text" 
            class="empty accomplishment w-full p-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="What did you achieve today?" ${required ? "required" : ""} />`;

  const cardContainer = document.getElementById("form");

  cardContainer.insertBefore(card, generateCardBtn);
}

inputAccomplishment("required");

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
  const inputs = Array.from(form.querySelectorAll("input")).slice(1, -1);

  tasksContainer.innerHTML = `<div class="text-center text-3xl font-bold mb-4 text-[#00ff00]" id="header">Day ${day}</div>`;

  inputs.forEach((input, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}. ${input.value}`;
    tasksContainer.appendChild(p);
  });

  title.innerHTML = "100 Days of Locked In";
  drawPie(day);

  quoteBox.textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
});

form.addEventListener("input", (e) => {
  const target = e.target;

  if (target.tagName === 'INPUT' &&
    target.type === 'text') {
    // when input gets empty: 
    if (target.value.trim() == '') {
      // del the input if accomplishment was written but then deleted i.e. empty, as we only want to keep one empty input 
      if ("written" === target.classList[10]) {
        target.parentElement.remove();
        form[1].required = true; // do this after the remover() 
        form.querySelectorAll("label.inputLabel").forEach((label, i) => {
          if (label.innerHTML.startsWith("Accomplishment")) {
            label.innerHTML = `Accomplishment #${i + 1}`;
          }
        });
      }
      // when anything is written:
    } else {
      // only runs first time when smth is writtn in input box
      if ("empty" === target.classList[0]) {
        // rm 'empty' class and add 'written' class to input which later restrict user from generating card with #0 Accomplishment, as input aren't init with "required"
        target.classList.remove("empty");
        target.classList.add("written");
        inputAccomplishment("");
        // correctly match and set "Add Accomplishment:" to "Accomplishment #n" 
        const labels = form.querySelectorAll("label.inputLabel");
        labels.forEach((label, i) => {
          label.innerHTML = `Accomplishment #${i + 1}`;
        });
        labels[labels.length - 1].innerHTML = "Add Accomplishment:";
      }
    }
  }
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
