/* function calculate() {
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
  OG code for first draft of this app */
  import React, { useState } from 'react';
  import { StyleSheet, Text, View, TextInput, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
  import { LineChart } from 'react-native-chart-kit';
  
  const App = () => {
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState('');
    const [spend, setSpend] = useState('');
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null);
  
    const calculate = () => {
      const annualSavings = income - expenses - spend;
      const savings = [];
  
      for (let i = 1; i <= 30; i++) {
        savings.push({ year: i, savings: annualSavings * i });
      }
  
      setChartData({
        labels: savings.map((item) => item.year.toString()),
        datasets: [
          {
            data: savings.map((item) => item.savings.toFixed(2)),
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      });
  
      setResult(annualSavings.toFixed(2));
    };
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Retire?</Text>
        <View style={styles.form}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Annual Income:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setIncome(value)}
              value={income}
              placeholder="Enter your annual income"
              keyboardType="numeric"
            />
          </View>
  
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Annual Expenses:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setExpenses(value)}
              value={expenses}
              placeholder="Enter your annual expenses"
              keyboardType="numeric"
            />
          </View>
  
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Projected Spend Per Year:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setSpend(value)}
              value={spend}
              placeholder="Enter your projected spend per year"
              keyboardType="numeric"
            />
          </View>
  
          <TouchableOpacity style={styles.button} onPress={calculate}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>
  
        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              You need to save {result} per year to retire in 30 years.
            </Text>
          </View>
        )}
  
        {chartData && (
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width - 20}
              height={250}
              chartConfig={{
                backgroundGradientFrom: '#f1f1f1',
                backgroundGradientTo: '#f1f1f1',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
        )}
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f1f1f1'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center'
    },
    form: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 16,
      marginBottom: 16
    },
    formInput: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8
    },
    label: {
      flex: 1
    },
    input: {
      flex: 2,
      height: 40,
      paddingHorizontal: 8,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center'
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16
    }
  });
  