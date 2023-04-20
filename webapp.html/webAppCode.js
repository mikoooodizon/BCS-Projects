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
  
  const result = `With a 6% annual growth rate in your saving, you'll need to save up ${nestEgg.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} to cover your projected annual spend of ${spend.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} for the next 30 years. You'll need to save for an additional ${remainingYears} years to reach this goal given you maintain annual income and expenses.`;
  
  document.getElementById('result').textContent = result;
  
  return result;
}
