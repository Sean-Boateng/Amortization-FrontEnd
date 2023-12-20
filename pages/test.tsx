import Amortization from "./Amortization";
import { useEffect } from 'react';
const amortize = require('amortize');

export default function Test() {

  interface AmortizationSchedule {
    period: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }
  
  function calculateAmortizationSchedule(
    loanAmount: number,
    interestRate: number,
    loanTermMonths: number
  ): AmortizationSchedule[] {
    let monthlyInterestRate=0
    if(interestRate == 0){
      monthlyInterestRate = 0.000001 / 100 / 12
    }
    else{
      monthlyInterestRate = interestRate / 100 / 12}
      const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));
  
      const schedule: AmortizationSchedule[] = [];
      let balance = loanAmount;
  
      for (let period = 1; period <= loanTermMonths; period++) {
        if(monthlyInterestRate ==0.0000000000016666667 ){
          const interest = 0;
          let principal = monthlyPayment - interest;
          if (period === loanTermMonths) {
            principal = balance; 
            balance = 0; 
          } else {
            balance -= principal;
          }

          schedule.push({
            period,
            payment: monthlyPayment,
            principal,
            interest,
            balance,
          })

        }
        else{
          const interest = balance * monthlyInterestRate;
          let principal = monthlyPayment - interest;
          if (period === loanTermMonths) {
            principal = balance; 
            balance = 0; 
          } else {
            balance -= principal;
          }
      
          schedule.push({
            period,
            payment: monthlyPayment,
            principal,
            interest,
            balance,
          });
        }
      
      }
  
    return schedule;
  }
  


    const loanAmount = 1000; // Loan amount
    const interestRate = 1.4; // Interest rate (in percentage)
    const loanTermMonths = 10; // Loan term in months

    const amortizationSchedule = calculateAmortizationSchedule(
      loanAmount,
      interestRate,
      loanTermMonths
    );
    console.log(amortizationSchedule);

    


    return (
      <main>
       <div>
      <h2>Amortization Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Period</th>
            <th>Payment</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {amortizationSchedule.map((row) => (
            <tr key={row.period}>
              <td>{row.period}</td>
              <td>${row.payment.toFixed(2)}</td>
              <td>${row.principal.toFixed(2)}</td>
              <td>${row.interest.toFixed(2)}</td>
              <td>${row.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
       
      </main>
    )
  }
  