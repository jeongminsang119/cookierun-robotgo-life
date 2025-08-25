



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

  function drawChart() {
    const data = selectedStock.priceHistory;
    ctx.clearRect(0, 0, elements.priceChart.width, elements.priceChart.height);

    // 가격계산
    const prices = data.map((d) => d.price);
    const minPrice = Math.min(...prices) * 0.9995;
    const maxPrice = Math.max(...prices) * 1.0005;
    const priceRange = maxPrice - minPrice;

    // 그리그생성
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;

    // 그리드선
    for (let i = 0; i <= 5; i++) {
      const y = (elements.priceChart.height / 5) * i;
      const price = maxPrice - priceRange * (i / 5);

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(elements.priceChart.width, y);
      ctx.stroke();

      ctx.fillStyle = "#666";
      ctx.textAlign = "right";
      ctx.fillText(formatPrice(price), elements.priceChart.width - 10, y - 5);
    }

    // 가격선
    ctx.strokeStyle = "#2196f3";
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((point, i) => {
      const x = (i / (data.length - 1)) * elements.priceChart.width;
      const y =
        elements.priceChart.height -
        ((point.price - minPrice) / priceRange) * elements.priceChart.height;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw volume bars
    const maxVolume = Math.max(...data.map((d) => d.volume));
    const volumeHeight = elements.priceChart.height * 0.2;

    data.forEach((point, i) => {
      const x = (i / (data.length - 1)) * elements.priceChart.width;
      const height = (point.volume / maxVolume) * volumeHeight;
      const y = elements.priceChart.height - height;

      ctx.fillStyle =
        point.price >= (data[i - 1]?.price ?? point.price)
          ? "rgba(0, 184, 148, 0.3)"
          : "rgba(255, 82, 82, 0.3)";

      ctx.fillRect(x - 2, y, 4, height);
    });
  }

  setInterval(drawChart, TICK_INTERVAL);
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
}

// 거래기능
function selectStock(code) {
  selectedStock = stocks.find((s) => s.code === code);
  updateUI();
}

function executeOrder(type, quantity) {
  const stock = selectedStock;
  const price =
    orderType === "market" ? stock.price : parseInt(elements.orderPrice.value);

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

    portfolio.cash -= total;
    portfolio.holdings[stock.code] =
      (portfolio.holdings[stock.code] || 0) + quantity;
  } else {
    const holding = portfolio.holdings[stock.code] || 0;
    if (quantity > holding) {
      alert("주문가능 수량이 부족합니다.");
      return;
    }

    portfolio.cash += total;
    portfolio.holdings[stock.code] -= quantity;

    if (portfolio.holdings[stock.code] === 0) {
      delete portfolio.holdings[stock.code];
    }
  }

  portfolio.orders.unshift({
    time: new Date(),
    type,
    code: stock.code,
    name: stock.name,
    quantity,
    price,
    total,
  });

  updateUI();
  alert(`${type === "buy" ? "매수" : "매도"} 주문이 체결되었습니다.`);
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
