const questions = [
  {
    id: 1,
    text: '당신은 새로운 사람을 만나면 자신을 소개하는 것을 좋아하나요?',
    yes: 'E',
    no: 'I',
  },
  {
    id: 2,
    text: '당신은 자주 계획을 세우는 편인가요?',
    yes: 'J',
    no: 'P',
  },
  {
    id: 3,
    text: '당신은 논쟁이나 불화를 싫어하나요?',
    yes: 'F',
    no: 'T',
  },
  {
    id: 4,
    text: '당신은 새로운 경험을 추구하나요?',
    yes: 'N',
    no: 'S',
  },
  {
    id: 5,
    text: '당신은 복잡한 문제를 해결하는 것을 좋아하나요?',
    yes: 'T',
    no: 'F',
  },
  {
    id: 6,
    text: '당신은 대부분의 사람들이 당신을 좋아하는 편인가요?',
    yes: 'E',
    no: 'I',
  },
  {
    id: 7,
    text: '어떤 일을 처리할 때, 빠르게 결정하는 것이 중요한가요?',
    yes: 'P',
    no: 'J',
  },
  {
    id: 8,
    text: '당신은 자신이 하는 일에 대해 열정을 느끼나요?',
    yes: 'J',
    no: 'P',
  },
  {
    id: 9,
    text: '당신은 대부분의 상황에서 논리적으로 생각하나요?',
    yes: 'T',
    no: 'F',
  },
  {
    id: 10,
    text: '당신은 쉽게 스트레스를 받나요?',
    yes: 'N',
    no: 'S',
  },
  {
    id: 11,
    text: '당신은 대부분의 시간을 집에서 보내는 것을 좋아하나요?',
    yes: 'I',
    no: 'E',
  },
  {
    id: 12,
    text: '새로운 아이디어나 가능성을 찾아보는 것이 즐겁나요?',
    yes: 'N',
    no: 'S',
  },
];

// index.js — 결과 계산 및 이동 추가 (questions 배열은 이미 선언되어 있다고 가정)

const questionEl = document.getElementById('question');
const questionNumberEl = document.getElementById('question-number');
const progressEl = document.querySelector('.progress');
const progressBarEl = document.getElementById('progressBar');
const yesBtn = document.getElementById('yes-button');
const noBtn = document.getElementById('no-button');

// 진행 상태
let currentIndex = 0;
const answers = []; // 예: ["E","N","T","J", ...]

// 첫 질문 표시
renderQuestion();
updateProgress();

// 버튼 이벤트 — 마지막 질문에서 결과 계산 → 로컬스토리지 저장 → result.html 이동
yesBtn.addEventListener('click', () => {
  const letter = questions[currentIndex].yes; // "예" 선택에 해당하는 지표
  answers[currentIndex] = letter;

  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
    updateProgress();
  } else {
    updateProgress();
    const result = computeResult(answers);
    localStorage.setItem('mbti_result', result);
    window.location.href = 'result.html';
  }
});

noBtn.addEventListener('click', () => {
  const letter = questions[currentIndex].no; // "아니오" 선택에 해당하는 지표
  answers[currentIndex] = letter;

  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
    updateProgress();
  } else {
    updateProgress();
    const result = computeResult(answers);
    localStorage.setItem('mbti_result', result);
    window.location.href = 'result.html';
  }
});

// ===== 함수들 =====
function renderQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.text;
  questionNumberEl.textContent = `${currentIndex} / ${questions.length}`; // 예: "1 / 12"
}

function updateProgress() {
  const answered = answers.length; // 현재까지 응답한 개수
  const percent = Math.round((answered / questions.length) * 100);
  progressBarEl.style.width = `${percent}%`;
  if (progressEl) {
    progressEl.setAttribute('aria-valuenow', String(answered));
  }
}

function computeResult(answersArr) {
  // 각 알파벳 개수 집계
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  for (const ch of answersArr) {
    if (counts[ch] !== undefined) counts[ch] += 1;
  }

  // 4가지 지표 각각 더 많은 알파벳 선택
  const ei = counts.E >= counts.I ? 'E' : 'I';
  const sn = counts.S >= counts.N ? 'S' : 'N';
  const tf = counts.T >= counts.F ? 'T' : 'F';
  const jp = counts.J >= counts.P ? 'J' : 'P';

  return ei + sn + tf + jp; // 예: "ENFP"
}
