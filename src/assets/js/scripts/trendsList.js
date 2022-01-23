import ApexCharts from 'apexcharts';

import chartConfig from '../chart/chartConfig.js';
import { cryptocurrencyData } from '../data/cryptocurrency.js';

export default (() => {
  const trendsList = document.querySelector('[data-trends-list]');

  if(!trendsList) return;

  const popularCryptocurrencies = cryptocurrencyData.filter(cryptocurrency => {
    let isPopular = false;

    cryptocurrency.categories.forEach(category => {
      if(category === 'Popular') isPopular = true;
    });

    return isPopular ? cryptocurrency : false;
  });

  const currentChartConfig = {
    ...chartConfig
  };

  currentChartConfig.chart.height = 100;
  currentChartConfig.colors = ['#0FAE96'];

  const getTrendCardTemplate = trendCard => `
    <li class="cards-list__card-default trend-card">
      <div class="trend-card__header">
        <div class="trend-card__icon">
          <img src="./assets/img/cryptocurrencies/${trendCard.icon}" alt="${trendCard.title}">
        </div>
        <div class="trend-card__name">
          <h3 class="trend-card__title">${trendCard.title}</h3>
          <p class="trend-card__label">${trendCard.label}</p>
        </div>
        <a href="${trendCard.link}" class="trend-card__link" aria-label="BITCOIN">
          <svg aria-hidden="true" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.54595 1.084L14.7383 1.79111M14.7383 1.79111L15.4454 10.9835M14.7383 1.79111L1.26166 15.2678" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
      <div class="trend-card__body">
        <div class="trend-card__values">
          <p class="trend-card__price">$${trendCard.price}</p>
          <p class="trend-card__percent">${trendCard.percent}%</p>
        </div>
        <div class="trend-card__chart" data-trends-list-chart-id="${trendCard.id}"></div>
      </div>
    </li>
  `;

  const init = () => {
    popularCryptocurrencies.forEach(trendCard => {
      trendsList.insertAdjacentHTML('beforeend', getTrendCardTemplate(trendCard));

      const chart = document.querySelector(`[data-trends-list-chart-id="${trendCard.id}"]`);

      new ApexCharts(chart, {
        ...currentChartConfig,
        series: [{
          data: trendCard.data
        }]
      }).render();
    });
  };

  init();
})();
