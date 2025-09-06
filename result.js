// result.js
document.addEventListener('DOMContentLoaded', () => {
  const RESULT_KEY = 'mbti_result';

  const resultSpan = document.getElementById('result');
  const resultText = document.getElementById('resultText');
  const restartBtn = document.getElementById('restart-button');

  // 로컬스토리지에서 값 가져오기
  const stored = (localStorage.getItem(RESULT_KEY) || '').trim();

  // MBTI 형식 간단 검증: E/I, N/S, F/T, J/P
  const isValidMbti = /^[EI][NS][FT][JP]$/.test(stored);

  if (isValidMbti) {
    // 정상 값이면 ~~~~ 부분만 채움 (뒤의 "입니다!"는 HTML에 이미 있음)
    if (resultSpan) resultSpan.textContent = stored;
  } else {
    // 값이 없거나 형식이 아니면 안내 문구로 교체하고 버튼 문구 변경
    if (resultText)
      resultText.textContent = '아직 테스트를 진행하지 않았습니다!';
    if (restartBtn) restartBtn.textContent = '테스트 하러 가기';
  }
});
