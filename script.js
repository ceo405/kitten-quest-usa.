const questions = [
  {
    kicker: "ROUND 1: POPULATION",
    prompt: "For the low U.S. estimate, how many outdoor cats are we counting?",
    choices: ["10 million", "25 million", "90 million"],
    answer: "25 million",
    explain: "The low U.S. estimate counts 25 million outdoor, free-roaming, stray, or feral cats.",
  },
  {
    kicker: "ROUND 2: REPRODUCTION",
    prompt: "For the U.S. estimate, how many kittens are counted in an average litter?",
    choices: ["1 kitten", "3 kittens", "8 kittens"],
    answer: "3 kittens",
    explain: "This U.S. estimate counts 3 kittens per litter, based on public summaries of free-ranging cat reproduction data.",
  },
  {
    kicker: "ROUND 3: LITTER RATE",
    prompt: "For the U.S. estimate, how many litters per year are counted for each breeding female cat?",
    choices: ["0.4 litters", "1.4 litters", "4.4 litters"],
    answer: "1.4 litters",
    explain: "This U.S. estimate counts 1.4 litters per year for each intact breeding female cat.",
  },
  {
    kicker: "ROUND 4: MIDPOINT",
    prompt: "What is the U.S. midpoint estimate for kittens born outside each day?",
    choices: ["14,148", "114,148", "1,114,148"],
    answer: "114,148",
    explain: "The midpoint scenario estimates about 114,148 outdoor kitten births per day in the United States.",
  },
  {
    kicker: "ROUND 5: DATA HONESTY",
    prompt: "What does the U.S. birth estimate measure?",
    choices: ["Births, not survival", "Only shelter intake", "Only adopted kittens"],
    answer: "Births, not survival",
    explain: "The estimate is about births. It does not claim that every kitten survives outdoors.",
  },
];

const kittenRewards = [
  { name: "Starter Kitten", text: "Answer correctly to meet a random common cat.", className: "kitten-0" },
];

const commonCats = [
  { name: "Orange Tabby", text: "Common cat unlocked: orange tabby.", className: "common-orange" },
  { name: "Gray Shorthair", text: "Common cat unlocked: gray shorthair.", className: "common-gray" },
  { name: "Tuxedo Cat", text: "Common cat unlocked: tuxedo cat.", className: "common-tuxedo" },
  { name: "Calico Cat", text: "Common cat unlocked: calico cat.", className: "common-calico" },
  { name: "Black Shorthair", text: "Common cat unlocked: black shorthair.", className: "common-black" },
  { name: "Brown Tabby", text: "Common cat unlocked: brown tabby.", className: "common-brown" },
];

const rareCat = {
  name: "Khao Manee",
  text: "Perfect 5/5! Rare breed unlocked: Khao Manee.",
  className: "kitten-special",
};

const state = {
  round: 0,
  score: 0,
  answered: false,
  perfect: true,
  collectedCats: [],
};

const els = {
  roundStatus: document.querySelector("#roundStatus"),
  scoreStatus: document.querySelector("#scoreStatus"),
  scoreBig: document.querySelector("#scoreBig"),
  questionKicker: document.querySelector("#questionKicker"),
  questionText: document.querySelector("#questionText"),
  answerGrid: document.querySelector("#answerGrid"),
  feedback: document.querySelector("#feedback"),
  nextButton: document.querySelector("#nextButton"),
  restartButton: document.querySelector("#restartButton"),
  kittenSprite: document.querySelector("#kittenSprite"),
  kittenName: document.querySelector("#kittenName"),
  rewardText: document.querySelector("#rewardText"),
  scoreCats: document.querySelector("#scoreCats"),
};

function renderQuestion() {
  const question = questions[state.round];
  state.answered = false;
  els.questionKicker.textContent = question.kicker;
  els.questionText.textContent = question.prompt;
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.nextButton.disabled = true;
  els.nextButton.textContent = state.round === questions.length - 1 ? "See Result" : "Next Round";
  els.answerGrid.innerHTML = "";

  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-card";
    button.textContent = choice;
    button.addEventListener("click", () => chooseAnswer(button, choice));
    els.answerGrid.append(button);
  });

  updateStatus();
}

function chooseAnswer(button, choice) {
  if (state.answered) {
    return;
  }

  const question = questions[state.round];
  const isCorrect = choice === question.answer;
  state.answered = true;

  [...els.answerGrid.children].forEach((answerButton) => {
    answerButton.disabled = true;
    if (answerButton.textContent === question.answer) {
      answerButton.classList.add("correct");
    }
  });

  if (isCorrect) {
    state.score += 1;
    button.classList.add("correct");
    els.feedback.textContent = `RIGHT! ${question.explain}`;
    els.feedback.classList.add("good");
    addScoreCat(state.score);
  } else {
    state.perfect = false;
    button.classList.add("wrong");
    els.feedback.textContent = `NOT THIS TIME. ${question.explain}`;
    els.feedback.classList.add("bad");
  }

  els.nextButton.disabled = false;
  updateStatus();
}

function getRandomCommonCat() {
  return commonCats[Math.floor(Math.random() * commonCats.length)];
}

function setKittenReward(reward) {
  els.kittenSprite.className = `pixel-cat ${reward.className}`;
  els.kittenName.textContent = reward.name;
  els.rewardText.textContent = reward.text;
}

function addScoreCat(score) {
  const reward = score >= 5 ? rareCat : getRandomCommonCat();
  state.collectedCats.push(reward);
  setKittenReward(reward);
  renderScoreCats(true);
}

function renderScoreCats(animateNewest = false) {
  els.scoreCats.innerHTML = "";

  for (let index = 0; index < questions.length; index += 1) {
    const reward = state.collectedCats[index];
    const slot = document.createElement("div");
    slot.className = "score-slot";

    if (reward) {
      slot.classList.add("filled", reward.className);
      if (animateNewest && index === state.collectedCats.length - 1) {
        slot.classList.add("pop-in");
      }
      slot.setAttribute("aria-label", `${reward.name} score cat`);
      slot.innerHTML = '<span class="mini-ear left"></span><span class="mini-ear right"></span><span class="mini-head"></span><span class="mini-eye left"></span><span class="mini-eye right"></span>';
    } else {
      slot.setAttribute("aria-label", "Empty score cat slot");
    }

    els.scoreCats.append(slot);
  }
}

function showResult() {
  els.questionKicker.textContent = "GAME COMPLETE";
  els.questionText.textContent = state.perfect
    ? "You got 5 out of 5 right and unlocked the rare breed kitten."
    : "Run complete. Restart for a perfect 5 out of 5 and the rare breed kitten.";
  els.answerGrid.innerHTML = "";
  els.feedback.textContent = state.perfect
    ? "RARE BREED UNLOCKED: Khao Manee."
    : `Final score: ${state.score}/5. Common cats are random, but the rare breed unlocks only on a perfect run.`;
  els.feedback.className = state.perfect ? "feedback good" : "feedback";
  els.nextButton.disabled = true;

  if (state.perfect) {
    setKittenReward(rareCat);
    state.collectedCats = Array.from({ length: questions.length }, () => rareCat);
    renderScoreCats(true);
  }
}

function updateStatus() {
  els.roundStatus.textContent = `ROUND ${Math.min(state.round + 1, 5)}/5`;
  els.scoreStatus.textContent = `SCORE ${state.score}`;
  els.scoreBig.textContent = `${state.score}/5`;
}

function nextRound() {
  if (state.round === questions.length - 1) {
    showResult();
    return;
  }

  state.round += 1;
  renderQuestion();
}

function restart() {
  state.round = 0;
  state.score = 0;
  state.answered = false;
  state.perfect = true;
  state.collectedCats = [];
  const reward = kittenRewards[0];
  setKittenReward(reward);
  renderScoreCats();
  renderQuestion();
}

els.nextButton.addEventListener("click", nextRound);
els.restartButton.addEventListener("click", restart);

restart();
