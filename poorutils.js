
// 유틸리티 함수들

// 숫자 포맷팅 함수
function formatNumber(num) {
  if (num < 1000) return Math.floor(num).toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + "K";
  if (num < 1000000000) return (num / 1000000).toFixed(1) + "M";
  if (num < 1000000000000) return (num / 1000000000).toFixed(1) + "B";
  return (num / 1000000000000).toFixed(1) + "T";
}

// 큰 숫자 포맷팅 (한국어)
function formatKoreanNumber(num) {
  if (num < 10000) {
    const hasFraction = Math.abs(num - Math.trunc(num)) > 1e-9;
    return num.toLocaleString(undefined, {
      minimumFractionDigits: hasFraction ? 1 : 0,
      maximumFractionDigits: 1,
    });
  }
  if (num < 100000000) return (num / 10000).toFixed(1) + "만";
  if (num < 1000000000000) return (num / 100000000).toFixed(1) + "억";
  return (num / 1000000000000).toFixed(1) + "조";
}

// 랜덤 정수 생성
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 확률 계산 (0-1 사이의 값)
function getRandomChance() {
  return Math.random();
}

// 가중 확률 선택
function weightedRandom(weights) {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) {
      return i;
    }
    random -= weights[i];
  }
  return weights.length - 1;
}

// 시간 포맷팅
function formatTime(seconds) {
  if (seconds < 60) return seconds + "초";
  if (seconds < 3600)
    return Math.floor(seconds / 60) + "분 " + (seconds % 60) + "초";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours + "시간 " + minutes + "분";
}

// 로컬 스토리지 헬퍼
const Storage = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("저장 실패:", e);
      return false;
    }
  },

  load: (key, defaultValue = null) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error("로드 실패:", e);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error("삭제 실패:", e);
      return false;
    }
  },
};

// 애니메이션 헬퍼
function animateElement(element, animationClass, duration = 1000) {
  element.classList.add(animationClass);
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, duration);
}

// 딜레이 함수
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 범위 내 값 제한
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// 퍼센티지 계산
function getPercentage(current, max) {
  return Math.min((current / max) * 100, 100);
}

// 피드백 햅틱 (모바일)
function triggerHaptic() {
  if ("vibrate" in navigator) {
    navigator.vibrate(50);
  }
}

// 사운드 재생 (추후 확장용)
function playSound(soundName) {
  // 향후 사운드 시스템 구현 시 사용
  console.log("Playing sound:", soundName);
}

// 색상 보간
function interpolateColor(color1, color2, factor) {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
  }
  return result;
}

// 이벤트 디바운싱
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 이벤트 쓰로틀링
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 랜덤 메시지 선택
function getRandomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

// 숫자 애니메이션
function animateNumber(element, start, end, duration = 1000) {
  const startTime = performance.now();
  const difference = end - start;

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = start + difference * progress;
    element.textContent = Math.floor(current);

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

// 화면 진동 효과
function shakeScreen(duration = 500) {
  const app = document.getElementById("app");
  app.style.animation = `shake 0.1s ease-in-out ${duration / 100}`;
  setTimeout(() => {
    app.style.animation = "";
  }, duration);
}

// CSS 애니메이션 정의 추가
const shakeKeyframes = `
  @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-2px); }
      75% { transform: translateX(2px); }
  }
  `;

// 스타일시트에 애니메이션 추가
if (!document.querySelector("#shake-animation")) {
  const style = document.createElement("style");
  style.id = "shake-animation";
  style.textContent = shakeKeyframes;
  document.head.appendChild(style);
}

