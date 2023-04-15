function calculate() {
    const income = parseFloat(document.getElementById("income").value);
    const expenses = parseFloat(document.getElementById("expenses").value);
    const spend = parseFloat(document.getElementById("spend").value);
    const years = 20;
    const annualSpendIncrease = 0.06;
  
    const annualDifference = income - expenses;
    const totalSavings = (spend / annualDifference) * (1 - Math.pow(1 + annualSpendIncrease, -years)) / annualSpendIncrease;
  
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `You need to save $${totalSavings.toFixed(2)} per year for ${years} years to achieve financial freedom.`;
  }
  