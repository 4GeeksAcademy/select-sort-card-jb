import "bootstrap";
import "./style.css";

const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const getRandomCard = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, value };
};

const getCardValue = card => {
  const index = values.indexOf(card.value);
  return index === -1 ? 0 : index;
};

const drawCards = count => {
  const cards = [];
  for (let i = 0; i < count; i++) cards.push(getRandomCard());
  return cards;
};

const renderCards = (cards, container) => {
  container.innerHTML = "";
  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card text-center mx-1 d-inline-block";
    cardDiv.innerHTML = `<div>${card.value}<br>${card.suit}</div>`;
    container.appendChild(cardDiv);
  });
};

const renderLog = log => {
  const logContainer = document.getElementById("selection-log");
  logContainer.innerHTML = "";

  log.forEach((step, i) => {
    const row = document.createElement("div");
    row.className = "my-1 d-flex align-items-center flex-wrap";

    const label = document.createElement("strong");
    label.className = "me-2";
    label.textContent = `${i}:`;
    row.appendChild(label);

    step.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card text-center mx-1 d-inline-block";
      cardDiv.innerHTML = `<div>${card.value}<br>${card.suit}</div>`;
      row.appendChild(cardDiv);
    });

    logContainer.appendChild(row);
  });
};

// Selection Sort with step logging
const selectionSort = cards => {
  const log = [];
  const clone = [...cards];
  log.push([...clone]);

  for (let i = 0; i < clone.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < clone.length; j++) {
      if (getCardValue(clone[j]) < getCardValue(clone[minIdx])) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [clone[i], clone[minIdx]] = [clone[minIdx], clone[i]];
      log.push([...clone]);
    }
  }

  return log;
};

window.onload = () => {
  const drawBtn = document.getElementById("drawBtn");
  const sortBtn = document.getElementById("sortBtn");
  const input = document.getElementById("cardCount");
  const cardContainer = document.getElementById("cardContainer");

  let currentCards = [];

  drawBtn.onclick = () => {
    const count = parseInt(input.value);
    currentCards = drawCards(count);
    renderCards(currentCards, cardContainer);
    document.getElementById("selection-log").innerHTML = "";
  };

  sortBtn.onclick = () => {
    const log = selectionSort(currentCards);
    renderLog(log);
  };
};
