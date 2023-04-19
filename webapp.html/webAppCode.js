function calculate() {
    const income = parseFloat(document.getElementById('incomeInput').value.replace(/,/g, ''));
    const expenses = parseFloat(document.getElementById('expensesInput').value.replace(/,/g, ''));
    const spend = parseFloat(document.getElementById('spendInput').value.replace(/,/g, ''));
    
    const projectedSpend = spend * Math.pow(1.06, 20);
    const result = projectedSpend * 20 / (income - expenses);
    
    document.getElementById('result').textContent = result.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    return result ;
  }
  