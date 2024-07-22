// assets/js/stock-ticker.js

const apiKey = 'S0TPX1N4SUD2TVLS';  // Replace with your Alpha Vantage API key
const symbols = ['AAPL', 'GOOGL', 'MSFT'];  // Add more stock symbols as needed

async function fetchStockData(symbol) {
  const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`);
  const data = await response.json();
  return data;
}

async function displayStockData() {
  const container = document.getElementById('stock-ticker');
  for (const symbol of symbols) {
    const data = await fetchStockData(symbol);
    const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
    const lastPrice = data['Time Series (5min)'][lastRefreshed]['1. open'];
    const stockElement = document.createElement('div');
    stockElement.className = 'stock-item';
    stockElement.innerHTML = `
      <div class="stock-block">
        <span class="stock-symbol">${symbol}</span>
        <span class="stock-price">${parseFloat(lastPrice).toFixed(2)}</span>
        <span class="stock-time">${lastRefreshed}</span>
      </div>
    `;
    container.appendChild(stockElement);
  }
}

document.addEventListener('DOMContentLoaded', displayStockData);
