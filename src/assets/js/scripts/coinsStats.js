import ApexCharts from 'apexcharts';

import chartConfig from '../chart/chartConfig.js';
import { cryptocurrencyCategories, cryptocurrencyData } from '../data/cryptocurrency.js';

export default (() => {
  const statsCategoriesWrapper = document.querySelector('[data-coins-stats-categories]');
  let statsCategories = null;
  const statsTable = document.querySelector('[data-coins-stats-table]');
  let coinsStatsRows = null;
  const searchBtn = document.querySelector('[data-coins-stats-btn-search]');
  const searchInput = document.querySelector('[data-coins-stats-search]');
  const labelNotFound = document.querySelector('[data-coins-stats-label-not-found]');

  if(!statsCategoriesWrapper || !statsTable || !searchBtn || !searchInput || !labelNotFound) return;

  let currentCategory = cryptocurrencyCategories[0];

  const currentChartConfig = {
    ...chartConfig
  };

  currentChartConfig.chart.height = 40;

  const getCoinStatTemplate = (coinStat, i) => `
    <tr data-categories="${coinStat.categories}" data-coin-stats-row="${coinStat.title} ${coinStat.label}">
      <td>${i + 1}</td>
      <td class="table-coins__name">
        <img src="./assets/img/cryptocurrencies/${coinStat.icon}" alt="${coinStat.title}">
        <span>${coinStat.label}</span>
        <span>${coinStat.title}</span>
      </td>
      <td>$${coinStat.price}</td>
      <td>${coinStat.percent}%</td>
      <td>
      <div class="table-coins__chart" data-table-coins-chart-id="${coinStat.id}"></div>
      </td>
      <td>
        <a href="${coinStat.link}" class="table-coins__link" aria-label="${coinStat.label}">Trade</a>
      </td>
    </tr>
  `;

  const getCategoryTemplate = category => `
    <li class="coins-stats__category">
      <button class="coins-stats__btn-category btn-secondary ${currentCategory === category ? 'btn-secondary_active' : ''}" data-coin-category="${category}">${category}</button>
    </li>
  `;

  const renderCoinsStats = () => {
    statsTable.innerHTML = '';
    let index = 0;

    cryptocurrencyData.forEach(coinStat => {
      let isCurrentCategory = false;

      coinStat.categories.forEach(category => {
        if(category === currentCategory) {
          isCurrentCategory = true;
        }
      });

      if(!isCurrentCategory) return;

      statsTable.insertAdjacentHTML('beforeend', getCoinStatTemplate(coinStat, index));

      const chart = document.querySelector(`[data-table-coins-chart-id="${coinStat.id}"]`);

      new ApexCharts(chart, {
        ...currentChartConfig,
        colors: coinStat.percent[0] === '+' ? ['#0FAE96'] : ['#C10404'],
        series: [{
          data: coinStat.data
        }]
      }).render();

      index++;
    });

    coinsStatsRows = statsTable.querySelectorAll('[data-coin-stats-row]');
  };

  const renderCategories = () => {
    cryptocurrencyCategories.forEach(category => {
      statsCategoriesWrapper.insertAdjacentHTML('beforeend', getCategoryTemplate(category));
    });

    statsCategories = statsCategoriesWrapper.querySelectorAll('[data-coin-category]');
  };

  const changeCategory = category => {
    currentCategory = category;

    statsCategories.forEach(categoryBtn => {
      categoryBtn.dataset.coinCategory === currentCategory
        ? categoryBtn.classList.add('btn-secondary_active')
        : categoryBtn.classList.remove('btn-secondary_active');
    });

    searchInput.value = '';
    labelNotFound.style.display = 'none';
    renderCoinsStats();
  };

  const search = () => {
    let counter = 0;

    if(searchInput.value.trim() === '') {
      searchInput.value = '';
      coinsStatsRows.forEach(coin => {
        coin.style.display = 'table-row';
      });
      counter = 1;
    } else {
      coinsStatsRows.forEach(coin => {
        const isMatch = coin.dataset.coinStatsRow.toLowerCase()
          .includes(searchInput.value.trim().toLowerCase());

        if(isMatch) {
          counter++;
          coin.style.display = 'table-row';
        } else {
          coin.style.display = 'none';
        }
      });
    }

    counter === 0 ? labelNotFound.style.display = 'block' : labelNotFound.style.display = 'none';
  };

  const addListeners = () => {
    statsCategoriesWrapper.addEventListener('click', e => {
      if(e.target && e.target.tagName === 'BUTTON' && e.target.dataset.coinCategory) {
        changeCategory(e.target.dataset.coinCategory);
      }
    });

    searchBtn.addEventListener('click', search);

    window.addEventListener('keyup', e => {
      if(searchInput === document.activeElement && e.key === 'Enter') search();
    });
  };

  const init = () => {
    renderCategories();
    renderCoinsStats();
    addListeners();
  };

  init();
})();
