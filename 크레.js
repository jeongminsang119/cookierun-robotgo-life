const TICK_INTERVAL = 1000;
const MAX_CHART_POINTS = 300;
const PRICE_DECIMALS = 0;
const QUANTITY_STEP = 1;
const PRICE_STEP = 100;

// 시장데이터
const stocks = [
  {
    code: "005930",
    name: "삼성전자",
    market: "KOSPI",
    price: 67800,
    sector: "전자",
  },
  {
    code: "000660",
    name: "SK하이닉스",
    market: "KOSPI",
    price: 138000,
    sector: "반도체",
  },
  {
    code: "035420",
    name: "NAVER",
    market: "KOSPI",
    price: 203000,
    sector: "IT",
  },
  {
    code: "035720",
    name: "카카오",
    market: "KOSPI",
    price: 56700,
    sector: "IT",
  },
  {
    code: "066570",
    name: "LG전자",
    market: "KOSPI",
    price: 98400,
    sector: "전자",
  },
  {
    code: "005380",
    name: "현대차",
    market: "KOSPI",
    price: 176500,
    sector: "자동차",
  },
  {
    code: "000270",
    name: "기아",
    market: "KOSPI",
    price: 82900,
    sector: "자동차",
  },
  {
    code: "005490",
    name: "POSCO홀딩스",
    market: "KOSPI",
    price: 458000,
    sector: "철강",
  },
  {
    code: "068270",
    name: "셀트리온",
    market: "KOSPI",
    price: 156800,
    sector: "제약",
  },
  {
    code: "207940",
    name: "삼성바이오로직스",
    market: "KOSPI",
    price: 748000,
    sector: "바이오",
  },
].map((stock) => ({
  ...stock,
  initialPrice: stock.price,
  high: stock.price,
  low: stock.price,
  volume: 0,
  change: 0,
  changePercent: 0,
  priceHistory: generateInitialPriceHistory(stock.price),
}));

// 갖고있는거
let selectedStock = stocks[0];
let orderType = "limit";
let portfolio = {
  cash: 100000000,
  holdings: {},
  orders: [],
};

// 나누기
const elements = {
  stockList: document.getElementById("stockList"),
  stockSearch: document.getElementById("stockSearch"),
  priceChart: document.getElementById("priceChart"),
  orderQuantity: document.getElementById("orderQuantity"),
  orderPrice: document.getElementById("orderPrice"),
  orderTotal: document.getElementById("orderTotal"),
  cashBalance: document.getElementById("cashBalance"),
  totalAssets: document.getElementById("totalAssets"),
  totalPnL: document.getElementById("totalPnL"),
  holdingsList: document.getElementById("holdingsList"),
  orderHistory: document.getElementById("orderHistory"),
};

// 퍼센트
function formatPrice(price) {
  return price.toLocaleString("ko-KR");
}

function formatChange(change, changePercent) {
  const sign = change >= 0 ? "▲" : "▼";
  return `${sign} ${Math.abs(change).toLocaleString(
    "ko-KR"
  )} (${changePercent.toFixed(2)}%)`;
}

function generateInitialPriceHistory(basePrice) {
  const history = [];
  let price = basePrice;

  for (let i = 0; i < MAX_CHART_POINTS; i++) {
    price = price * (1 + (Math.random() - 0.5) * 0.002);
    history.push({
      time: Date.now() - (MAX_CHART_POINTS - i) * TICK_INTERVAL,
      price: Math.round(price),
      volume: Math.floor(Math.random() * 100000) + 50000,
    });
  }

  return history;
}

// 차트그리자
function initChart() {
  const ctx = elements.priceChart.getContext("2d");

  function resizeCanvas() {
    elements.priceChart.width =
      elements.priceChart.parentElement.offsetWidth - 40;
    elements.priceChart.height = 400;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  setInterval(drawCandleChart, TICK_INTERVAL);
}

// 시장업데이트
function updatePrices() {
  stocks.forEach((stock) => {
    const volatility = 0.002; //0.2퍼 거래량
    const change = stock.price * (Math.random() - 0.5) * volatility;
    const newPrice = Math.max(stock.price + change, stock.price * 0.7); // 한계

    stock.price = Math.round(newPrice / PRICE_STEP) * PRICE_STEP;
    stock.high = Math.max(stock.high, stock.price);
    stock.low = Math.min(stock.low, stock.price);
    stock.change = stock.price - stock.initialPrice;
    stock.changePercent = (stock.change / stock.initialPrice) * 100;
    stock.volume += Math.floor(Math.random() * 10000);

    stock.priceHistory.push({
      time: Date.now(),
      price: stock.price,
      volume: Math.floor(Math.random() * 100000) + 50000,
    });

    stock.priceHistory.shift();
  });

  processOrders();
  updateUI();
}

// UI 쓰기
function updateUI() {
  // 종목업데이트
  elements.stockList.innerHTML = stocks
    .map(
      (stock) => `
            <div class="stock-item ${
              stock.code === selectedStock.code ? "selected" : ""
            }"
                 onclick="selectStock('${stock.code}')">
                <div class="stock-info">
                    <div class="stock-name">${stock.name}</div>
                    <div class="stock-code">${stock.code}</div>
                </div>
                <div class="stock-price">
                    <div>${formatPrice(stock.price)}원</div>
                    <div class="price-change ${
                      stock.change >= 0 ? "positive" : "negative"
                    }">
                        ${formatChange(stock.change, stock.changePercent)}
                    </div>
                </div>
            </div>
        `
    )
    .join("");

  // 검색업데이트
  if (selectedStock) {
    document.getElementById("selectedStockName").textContent =
      selectedStock.name;
    document.getElementById("stockCode").textContent = selectedStock.code;
    document.getElementById("currentPrice").textContent =
      formatPrice(selectedStock.price) + "원";

    const priceChange = document.getElementById("priceChange");
    priceChange.className = `price-change ${
      selectedStock.change >= 0 ? "positive" : "negative"
    }`;
    priceChange.innerHTML = `
            <span class="change-amount">
                ${selectedStock.change >= 0 ? "▲" : "▼"} 
                ${Math.abs(selectedStock.change).toLocaleString()}
            </span>
            <span class="change-percent">
                (${
                  selectedStock.change >= 0 ? "+" : ""
                }${selectedStock.changePercent.toFixed(2)}%)
            </span>
        `;
  }

  // 포트폴리오 업데이트
  updatePortfolio();
}

function updatePortfolio() {
  const totalStockValue = Object.entries(portfolio.holdings).reduce(
    (total, [code, quantity]) => {
      const stock = stocks.find((s) => s.code === code);
      return total + stock.price * quantity;
    },
    0
  );

  const totalValue = portfolio.cash + totalStockValue;
  const pnl = totalValue - 100000000;
  const pnlPercent = (pnl / 100000000) * 100;

  elements.cashBalance.textContent = formatPrice(portfolio.cash) + "원";
  elements.totalAssets.textContent = formatPrice(totalValue) + "원";
  elements.totalPnL.textContent = `${pnl >= 0 ? "+" : ""}${formatPrice(
    pnl
  )}원 (${pnlPercent.toFixed(2)}%)`;
  elements.totalPnL.className = `value ${pnl >= 0 ? "positive" : "negative"}`;

  // 보유종목업데이트
  elements.holdingsList.innerHTML = Object.entries(portfolio.holdings)
    .map(([code, quantity]) => {
      const stock = stocks.find((s) => s.code === code);
      const value = stock.price * quantity;
      return `
                <div class="holding-item">
                    <div class="holding-name">${stock.name}</div>
                    <div class="holding-details">
                        <div>${quantity}주</div>
                        <div>${formatPrice(value)}원</div>
                    </div>
                </div>
            `;
    })
    .join("");

  // 주문내역 업데이트
  elements.orderHistory.innerHTML = portfolio.orders
    .map(
      (order) => `
      <div class="history-item">
        <div>${order.time.toLocaleString()} [${order.type === "buy" ? "매수" : "매도"}] ${order.name} ${order.quantity}주 @ ${order.price.toLocaleString()}원 
        <span style="color:${order.status==="체결"?"#00b894":"#ffd600"}">[${order.status}]</span>
        </div>
      </div>
    `
    )
    .join("");
}

// 거래기능
function selectStock(code) {
  selectedStock = stocks.find((s) => s.code === code);
  updateUI();
}

function executeOrder(type, quantity) {
  const stock = selectedStock;
  const price =
    orderType === "market"
      ? stock.price
      : parseInt(elements.orderPrice.value);

  if (isNaN(quantity) || quantity <= 0) {
    alert("올바른 수량을 입력하세요.");
    return;
  }

  const total = price * quantity;

  if (type === "buy") {
    if (total > portfolio.cash) {
      alert("주문가능 금액이 부족합니다.");
      return;
    }
    // 예약 주문 추가 (즉시 체결 X)
    portfolio.orders.unshift({
      time: new Date(),
      type,
      code: stock.code,
      name: stock.name,
      quantity,
      price,
      total,
      status: "예약중",
    });
    portfolio.cash -= total; // 예수금 차감(예약)
    updateUI();
    alert("매수 예약이 등록되었습니다.");
  } else {
    const holding = portfolio.holdings[stock.code] || 0;
    if (quantity > holding) {
      alert("주문가능 수량이 부족합니다.");
      return;
    }
    // 예약 주문 추가 (즉시 체결 X)
    portfolio.orders.unshift({
      time: new Date(),
      type,
      code: stock.code,
      name: stock.name,
      quantity,
      price,
      total,
      status: "예약중",
    });
    portfolio.holdings[stock.code] -= quantity; // 보유수량 차감(예약)
    if (portfolio.holdings[stock.code] === 0) {
      delete portfolio.holdings[stock.code];
    }
    updateUI();
    alert("매도 예약이 등록되었습니다.");
  }
}

// 예약 주문 자동 체결 (시장가/지정가 조건 충족 시)
function processOrders() {
  portfolio.orders.forEach((order) => {
    if (order.status !== "예약중") return;
    const stock = stocks.find((s) => s.code === order.code);
    if (
      (order.type === "buy" && stock.price <= order.price) ||
      (order.type === "sell" && stock.price >= order.price)
    ) {
      order.status = "체결";
      if (order.type === "buy") {
        portfolio.holdings[order.code] =
          (portfolio.holdings[order.code] || 0) + order.quantity;
      } else {
        portfolio.cash += order.price * order.quantity;
      }
    }
  });
  updateUI();
}

// --- 실시간 뉴스 영역 바로 표시 ---
function injectNewsArea() {
  let newsDiv = document.getElementById("newsArea");
  if (!newsDiv) {
    newsDiv = document.createElement("div");
    newsDiv.id = "newsArea";
    newsDiv.style = `
      position:fixed;
      top:60px;
      left:0;
      width:100vw;
      z-index:2000;
      background:#242424ee;
      color:#fff;
      border-bottom:2px solid #2196f3;
      border-radius:0 0 12px 12px;
      font-size:1.2rem;
      padding:18px 0 12px 0;
      text-align:center;
      box-shadow:0 2px 12px #0006;
      font-weight:bold;
      letter-spacing:0.5px;
    `;
    newsDiv.innerHTML = `<span style="color:#ffd600; font-size:1.3rem;">📰 실시간 뉴스</span><div id="newsText"></div>`;
    document.body.prepend(newsDiv);
  }
}
injectNewsArea();

function showNews(text) {
  const newsText = document.getElementById("newsText");
  if (newsText) newsText.innerHTML = text;
}

// 뉴스 기사 다양하게 추가
const newsPool = [
  { headline: "비트코인, 1억 돌파! 투자자 환호", impact: { code: "BTCFUT", effect: 0.03 } },
  { headline: "비트코인, 급락! 규제 이슈로 10% 하락", impact: { code: "BTCFUT", effect: -0.04 } },
  { headline: "삼성전자, AI 반도체 출시! 기대감 ↑", impact: { code: "005930", effect: 0.015 } },
  { headline: "삼성전자, 실적 부진… 주가 하락", impact: { code: "005930", effect: -0.012 } },
  { headline: "SK하이닉스, 메모리 가격 반등! 강세", impact: { code: "000660", effect: 0.018 } },
  { headline: "SK하이닉스, 글로벌 공급망 차질", impact: { code: "000660", effect: -0.015 } },
  { headline: "NAVER, 해외 진출 성공! 상승세", impact: { code: "035420", effect: 0.013 } },
  { headline: "NAVER, 서비스 장애 발생… 약세", impact: { code: "035420", effect: -0.014 } },
  { headline: "카카오, 신규 서비스 출시! 기대감", impact: { code: "035720", effect: 0.012 } },
  { headline: "카카오, 서비스 장애 발생… 약세", impact: { code: "035720", effect: -0.018 } },
  { headline: "LG전자, 신제품 TV 흥행", impact: { code: "066570", effect: 0.011 } },
  { headline: "LG전자, 해외 시장 부진", impact: { code: "066570", effect: -0.009 } },
  { headline: "현대차, 전기차 수출 급증! 자동차주 강세", impact: { code: "005380", effect: 0.012 } },
  { headline: "현대차, 노사 갈등… 생산 차질", impact: { code: "005380", effect: -0.013 } },
  { headline: "기아, 친환경차 판매 호조", impact: { code: "000270", effect: 0.008 } },
  { headline: "기아, 실적 부진… 주가 하락", impact: { code: "000270", effect: -0.009 } },
  { headline: "POSCO홀딩스, 철강 가격 인상 발표", impact: { code: "005490", effect: 0.01 } },
  { headline: "POSCO홀딩스, 원자재 가격 급등 부담", impact: { code: "005490", effect: -0.012 } },
  { headline: "셀트리온, 신약 임상 성공! 제약주 강세", impact: { code: "068270", effect: 0.02 } },
  { headline: "셀트리온, 신약 임상 실패… 제약주 하락", impact: { code: "068270", effect: -0.02 } },
  { headline: "삼성바이오로직스, 대규모 투자 소식", impact: { code: "207940", effect: 0.011 } },
  { headline: "삼성바이오로직스, 규제 리스크 부각", impact: { code: "207940", effect: -0.013 } },
];

// 뉴스가 10초마다 항상 갱신되도록
function triggerNews() {
  const news = newsPool[Math.floor(Math.random() * newsPool.length)];
  showNews(`📢 <span style="color:#ffd600">${news.headline}</span>`);
  const stock = stocks.find(s => s.code === news.impact.code);
  if (stock) {
    const effect = news.impact.effect * (Math.random() * 0.7 + 0.7);
    stock.price = Math.max(Math.round(stock.price * (1 + effect) / PRICE_STEP) * PRICE_STEP, stock.price * 0.7);
    stock.priceHistory.push({ time: Date.now(), price: stock.price, volume: Math.floor(Math.random() * 100000) + 50000 });
    stock.priceHistory.shift();
  }
  updateUI();
}
setInterval(triggerNews, 10000);

// --- 호가창 UI 완벽하게 ---
function renderOrderbook() {
  const bookDiv = document.getElementById("orderbook");
  if (!bookDiv) return;
  const price = selectedStock.price;
  const step = PRICE_STEP;
  let html = `<div style="font-weight:bold; text-align:center; margin-bottom:6px; color:#ffd600;">실시간 호가</div>`;
  // 매도호가 (상위 5개)
  for(let i=5;i>=1;i--) html += `<div style="color:#ff5252;display:flex;justify-content:space-between;padding:4px 12px;">
    <span>매도</span><span>${(price+step*i).toLocaleString()}원</span><span>${Math.floor(Math.random()*200+50)}주</span></div>`;
  // 현재가
  html += `<div style="color:#ffd600;font-weight:bold;display:flex;justify-content:space-between;padding:6px 12px;border-top:1px solid #444;border-bottom:1px solid #444;">
    <span>현재가</span><span>${price.toLocaleString()}원</span><span>${Math.floor(Math.random()*500+100)}주</span></div>`;
  // 매수호가 (하위 5개)
  for(let i=1;i<=5;i++) html += `<div style="color:#00b894;display:flex;justify-content:space-between;padding:4px 12px;">
    <span>매수</span><span>${(price-step*i).toLocaleString()}원</span><span>${Math.floor(Math.random()*200+50)}주</span></div>`;
  bookDiv.innerHTML = html;
}

// 예약매수(지정가/시장가) 기능: 주문은 예약만, 체결은 가격 도달 시만
function executeOrder(type, quantity) {
  const stock = selectedStock;
  const price =
    orderType === "market"
      ? stock.price
      : parseInt(elements.orderPrice.value);

  if (isNaN(quantity) || quantity <= 0) {
    alert("올바른 수량을 입력하세요.");
    return;
  }

  const total = price * quantity;

  if (type === "buy") {
    if (total > portfolio.cash) {
      alert("주문가능 금액이 부족합니다.");
      return;
    }
    // 예약 주문 추가 (즉시 체결 X)
    portfolio.orders.unshift({
      time: new Date(),
      type,
      code: stock.code,
      name: stock.name,
      quantity,
      price,
      total,
      status: "예약중",
    });
    portfolio.cash -= total; // 예수금 차감(예약)
    updateUI();
    alert("매수 예약이 등록되었습니다.");
  } else {
    const holding = portfolio.holdings[stock.code] || 0;
    if (quantity > holding) {
      alert("주문가능 수량이 부족합니다.");
      return;
    }
    // 예약 주문 추가 (즉시 체결 X)
    portfolio.orders.unshift({
      time: new Date(),
      type,
      code: stock.code,
      name: stock.name,
      quantity,
      price,
      total,
      status: "예약중",
    });
    portfolio.holdings[stock.code] -= quantity; // 보유수량 차감(예약)
    if (portfolio.holdings[stock.code] === 0) {
      delete portfolio.holdings[stock.code];
    }
    updateUI();
    alert("매도 예약이 등록되었습니다.");
  }
}

// 예약 주문 자동 체결 (시장가/지정가 조건 충족 시만)
function processOrders() {
  portfolio.orders.forEach((order) => {
    if (order.status !== "예약중") return;
    const stock = stocks.find((s) => s.code === order.code);
    if (
      (order.type === "buy" && stock.price <= order.price) ||
      (order.type === "sell" && stock.price >= order.price)
    ) {
      order.status = "체결";
      if (order.type === "buy") {
        portfolio.holdings[order.code] =
          (portfolio.holdings[order.code] || 0) + order.quantity;
      } else {
        portfolio.cash += order.price * order.quantity;
      }
    }
  });
  updateUI();
}

// 가격 업데이트 시 예약 주문 자동 처리
function updatePrices() {
  stocks.forEach((stock) => {
    const volatility = 0.002;
    const change = stock.price * (Math.random() - 0.5) * volatility;
    const newPrice = Math.max(stock.price + change, stock.price * 0.7);
    stock.price = Math.round(newPrice / PRICE_STEP) * PRICE_STEP;
    stock.high = Math.max(stock.high, stock.price);
    stock.low = Math.min(stock.low, stock.price);
    stock.change = stock.price - stock.initialPrice;
    stock.changePercent = (stock.change / stock.initialPrice) * 100;
    stock.volume += Math.floor(Math.random() * 10000);
    stock.priceHistory.push({
      time: Date.now(),
      price: stock.price,
      volume: Math.floor(Math.random() * 100000) + 50000,
    });
    stock.priceHistory.shift();
  });
  processOrders();
  updateUI();
}

// 이벤트
document.getElementById("buyButton").addEventListener("click", () => {
  const quantity = parseInt(elements.orderQuantity.value);
  executeOrder("buy", quantity);
});

document.getElementById("sellButton").addEventListener("click", () => {
  const quantity = parseInt(elements.orderQuantity.value);
  executeOrder("sell", quantity);
});

elements.orderQuantity.addEventListener("input", () => {
  const quantity = parseInt(elements.orderQuantity.value);
  const price =
    orderType === "market"
      ? selectedStock.price
      : parseInt(elements.orderPrice.value);

  if (!isNaN(quantity) && !isNaN(price)) {
    elements.orderTotal.textContent = formatPrice(quantity * price) + "원";
  }
});

elements.orderPrice.addEventListener("input", () => {
  const quantity = parseInt(elements.orderQuantity.value);
  const price = parseInt(elements.orderPrice.value);

  if (!isNaN(quantity) && !isNaN(price)) {
    elements.orderTotal.textContent = formatPrice(quantity * price) + "원";
  }
});

// 정리
function init() {
  initChart();
  updateUI();
  setInterval(updatePrices, TICK_INTERVAL);

  //가격정리
  elements.orderPrice.value = selectedStock.price;
}

// 여는거
window.onload = init;

// --- 실제 주식처럼 봉차트(캔들차트) 개선 ---
function drawCandleChart() {
  const ctx = elements.priceChart.getContext("2d");
  const data = selectedStock.priceHistory;
  ctx.clearRect(0, 0, elements.priceChart.width, elements.priceChart.height);

  // 캔들 데이터 생성
  const candleCount = Math.min(60, data.length);
  const candleWidth = Math.max(6, elements.priceChart.width / candleCount);
  const prices = data.map((d) => d.price);
  const minPrice = Math.min(...prices) * 0.998;
  const maxPrice = Math.max(...prices) * 1.002;
  const priceRange = maxPrice - minPrice;

  // Y축 가격 눈금
  ctx.font = "14px Segoe UI";
  ctx.fillStyle = "#bbb";
  ctx.textAlign = "right";
  for (let i = 0; i <= 5; i++) {
    const y = (elements.priceChart.height / 5) * i;
    const price = maxPrice - priceRange * (i / 5);
    ctx.fillText(formatPrice(Math.round(price)), elements.priceChart.width - 10, y + 4);
    ctx.strokeStyle = "#333";
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(elements.priceChart.width, y);
    ctx.stroke();
  }

  // 캔들 그리기
  for (let i = 0; i < candleCount; i++) {
    const idx = data.length - candleCount + i;
    const candleData = data.slice(Math.max(0, idx - 4), idx + 1);
    const open = candleData[0]?.price ?? data[idx].price;
    const close = candleData[candleData.length - 1]?.price ?? data[idx].price;
    const high = Math.max(...candleData.map((d) => d.price));
    const low = Math.min(...candleData.map((d) => d.price));

    const x = i * candleWidth + candleWidth / 2;
    const yOpen = elements.priceChart.height - ((open - minPrice) / priceRange) * elements.priceChart.height;
    const yClose = elements.priceChart.height - ((close - minPrice) / priceRange) * elements.priceChart.height;
    const yHigh = elements.priceChart.height - ((high - minPrice) / priceRange) * elements.priceChart.height;
    const yLow = elements.priceChart.height - ((low - minPrice) / priceRange) * elements.priceChart.height;

    // 급등/급락 색상 강조
    let color = close >= open ? "#00b894" : "#ff5252";
    if (Math.abs(close - open) > selectedStock.price * 0.02) color = "#ffd600";

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    // 고가~저가 선
    ctx.beginPath();
    ctx.moveTo(x, yHigh);
    ctx.lineTo(x, yLow);
    ctx.stroke();

    // 몸통
    ctx.fillStyle = color;
    ctx.fillRect(
      x - candleWidth / 3,
      Math.min(yOpen, yClose),
      candleWidth / 1.5,
      Math.abs(yOpen - yClose) || 2
    );
  }

  // 현재가 표시
  ctx.fillStyle = "#2196f3";
  ctx.font = "bold 16px Segoe UI";
  ctx.textAlign = "left";
  ctx.fillText(
    "현재가: " + formatPrice(selectedStock.price) + "원",
    12,
    28
  );
}

// --- 주문수량, 시장가, 호가 기능 개선 ---
document.querySelectorAll(".qty-btn").forEach((btn) => {
  btn.onclick = () => {
    const val = btn.dataset.qty;
    if (val === "max") {
      const price =
        orderType === "market"
          ? selectedStock.price
          : parseInt(elements.orderPrice.value);
      elements.orderQuantity.value = Math.floor(portfolio.cash / price);
    } else {
      elements.orderQuantity.value = val;
    }
    elements.orderQuantity.dispatchEvent(new Event("input"));
  };
});
document.querySelectorAll(".price-btn").forEach((btn) => {
  btn.onclick = () => {
    let price = parseInt(elements.orderPrice.value) || selectedStock.price;
    price += PRICE_STEP * parseInt(btn.dataset.adjust);
    price = Math.max(price, 100);
    elements.orderPrice.value = price;
    elements.orderPrice.dispatchEvent(new Event("input"));
  };
});
document.querySelectorAll(".order-tab").forEach((tab) => {
  tab.onclick = () => {
    document.querySelectorAll(".order-tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    orderType = tab.dataset.order;
    if (orderType === "market") {
      elements.orderPrice.value = selectedStock.price;
      elements.orderPrice.disabled = true;
    } else {
      elements.orderPrice.disabled = false;
    }
    elements.orderPrice.dispatchEvent(new Event("input"));
  };
});

function updateUI() {
  // 종목업데이트
  elements.stockList.innerHTML = stocks
    .map(
      (stock) => `
            <div class="stock-item ${
              stock.code === selectedStock.code ? "selected" : ""
            }"
                 onclick="selectStock('${stock.code}')">
                <div class="stock-info">
                    <div class="stock-name">${stock.name}</div>
                    <div class="stock-code">${stock.code}</div>
                </div>
                <div class="stock-price">
                    <div>${formatPrice(stock.price)}원</div>
                    <div class="price-change ${
                      stock.change >= 0 ? "positive" : "negative"
                    }">
                        ${formatChange(stock.change, stock.changePercent)}
                    </div>
                </div>
            </div>
        `
    )
    .join("");

  // 검색업데이트
  if (selectedStock) {
    document.getElementById("selectedStockName").textContent =
      selectedStock.name;
    document.getElementById("stockCode").textContent = selectedStock.code;
    document.getElementById("currentPrice").textContent =
      formatPrice(selectedStock.price) + "원";

    const priceChange = document.getElementById("priceChange");
    priceChange.className = `price-change ${
      selectedStock.change >= 0 ? "positive" : "negative"
    }`;
    priceChange.innerHTML = `
            <span class="change-amount">
                ${selectedStock.change >= 0 ? "▲" : "▼"} 
                ${Math.abs(selectedStock.change).toLocaleString()}
            </span>
            <span class="change-percent">
                (${
                  selectedStock.change >= 0 ? "+" : ""
                }${selectedStock.changePercent.toFixed(2)}%)
            </span>
        `;
  }

  // 포트폴리오 업데이트
  updatePortfolio();

  // 호가창 표시
  renderOrderbook();

  // 뉴스 표시 (뉴스는 showNews에서 자동 갱신됨)
}
