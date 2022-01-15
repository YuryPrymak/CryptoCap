import ApexCharts from 'apexcharts';

export default (() => {
  const trendsList = document.querySelector('[data-trends-list]');
  const data = [
    {
      id: 33505384,
      icon: 'btc.png',
      title: 'BTC',
      label: 'BITCOIN',
      link: '#',
      price: '56,623.54',
      percent: '+1.41',
      data: [30943, 53950, 60573, 45696, 47582, 56623]
    },
    {
      id: 35605384,
      icon: 'eth.png',
      title: 'ETH',
      label: 'ETHEREUM',
      link: '#',
      price: '4,267.90',
      percent: '+2.22',
      data: [10943, 5390, 3449, 7058, 2355, 4267]
    },
    {
      id: 33563384,
      icon: 'bnb.png',
      title: 'BNB',
      label: 'BINANCE',
      link: '#',
      price: '587.74',
      percent: '-0.82',
      data: [109, 539, 344, 705, 235, 587]
    },
    {
      id: 33526384,
      icon: 'usdt.png',
      title: 'USDT',
      label: 'TETHER',
      link: '#',
      price: '356.98',
      percent: '+0,03',
      data: [367, 752, 267, 624, 356, 456]
    }
  ];
  const chartOptions = {
    chart: {
      type: 'area',
      height: 100,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#0FAE96'],
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false,
      padding: {
        top: -20,
        right: 0,
        bottom: -20,
        left: -10
      }
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      tooltip: {
        enabled: false
      },
    },
    yaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      tooltip: {
        enabled: false
      },
    }
  };

  const getTrendCard = trendCard => `
    <li class="card-list__card-default trend-card">
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
        <div class="trend-card__chart" data-chart-id="${trendCard.id}"></div>
      </div>
    </li>
  `;

  data.forEach(trendCard => {
    trendsList.insertAdjacentHTML('beforeend', getTrendCard(trendCard));

    const chart = document.querySelector(`[data-chart-id="${trendCard.id}"]`);

    new ApexCharts(chart, {
      ...chartOptions,
      series: [{
        data: trendCard.data
      }]
    }).render();
  });
})();
