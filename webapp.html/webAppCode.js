function calculate() {
  const income = parseFloat(document.getElementById('incomeInput').value.replace(/,/g, ''));
  const expenses = parseFloat(document.getElementById('expensesInput').value.replace(/,/g, ''));
  const spend = parseFloat(document.getElementById('spendInput').value.replace(/,/g, ''));

  const growthRate = 1.06;
  const projectionYears = 30;
  let nestEgg = 0;
  let remainingYears = 0;

  for (let i = 1; i <= projectionYears; i++) {
    nestEgg += spend / (Math.pow(growthRate, i));
  }

  remainingYears = Math.ceil(Math.log(nestEgg / (income - expenses)) / Math.log(growthRate));

  const result = `With a 6% annual growth rate, you'll need to save up ${nestEgg.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} to sustain your projected spend of ${spend.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} for 30 years. You'll need to save for an additional ${remainingYears} years to reach this goal.`;

  const data = {
    labels: [],
    datasets: [
      {
        label: 'Nest Egg Required',
        data: [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1
      }
    ]
  };

  let cumulativeSpend = 0;

  for (let i = 1; i <= projectionYears; i++) {
    cumulativeSpend += spend;
    const presentValue = cumulativeSpend / Math.pow(growthRate, i);
    data.labels.push(`Year ${i}`);
    data.datasets[0].data.push(presentValue);
  }

  const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return '$' + value.toLocaleString();
            }
          }
        }]
      }
    }
  });

  document.getElementById('result').textContent = result;
  const downloadLink = document.getElementById('download-link');
  downloadLink.href = chart.toBase64Image();
  downloadLink.download = 'nest-egg-chart.png';
  downloadLink.style.display = 'block';

  return result;
}

