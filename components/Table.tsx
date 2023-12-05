import React, { useEffect, useState } from 'react';
import { LoanInstance } from 'loanjs';
import { ExcelFile, ExcelSheet, ExcelColumn } from 'react-data-export';
import ExcelJS from 'exceljs';


interface TableProps {
  loan: LoanInstance | null;
  rate: number | null;
}

const Table: React.FC<TableProps> = ({ loan,rate}) => {

  if (!loan) {
    return null;
  }
  const totalInstallments = loan.installments.length;
  const plural = totalInstallments > 1;

const averageMonthlyPayment = (loan.sum / totalInstallments).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const handleExport = () => {

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Loan Installments');

  worksheet.addRow(['Loan Amount','Months', 'Interest']);
  worksheet.addRow([loan.amount,totalInstallments,rate?.toFixed(2)]);
  worksheet.addRow(['Month', 'Monthly Payment', 'Principal Payment', 'Interest Payment', 'Remaining Balance']);

  loan.installments.forEach((item, index) => {
    worksheet.addRow([index + 1, item.capital + item.interest, item.capital, item.interest, item.remain]);
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'loan_installments.xlsx';
    a.click();
  });
};

  return (
    <div style={{}}>
      <div></div>
      

      <div className='rectangle' >
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',marginBottom:'5px',}}>
          <div>SUMMARY</div>
          {plural ? (
        <div># of Payments: {totalInstallments} months</div>
      ) : (
        <div># of Payments: {totalInstallments} month</div>
      )}

        </div>
        <div className='underline'></div>

        <div className="card-body" style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <div style={{display:'flex', flexDirection:'column'}}>
              <h3  style={{color:'#6419E6', fontSize:'14px'}}>Total Cost</h3>
              <p style={{fontSize:'16px'}}>${String(loan.sum).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
            <h3  style={{color:'#6419E6', fontSize:'14px'}}>Total Interest</h3>
            <p style={{fontSize:'16px'}}>${String(loan.interestSum).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
            <h3  style={{color:'#6419E6', fontSize:'14px'}}>Avg. Monthly Payment</h3>
            <p style={{fontSize:'16px'}}>${(averageMonthlyPayment)}</p>
            </div>
            
            <button
              className='btn btn-outline btn-primary'
              onClick={handleExport}
            >
              Export to Excel
            </button>
            
          </div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>

        </div>
      </div>

    <div className="overflow-x-auto page-container">
  <table className="table table-sticky-header">

    <thead>
      <tr>
        <th>Month</th>
        <th>Monthly Payment</th>
        <th>Principal Payment</th>
        <th>Interest Payment</th>
        <th>Remaining Balance</th>
      </tr>
    </thead>
    <tbody>
    {loan.installments.map((item, index) => (
      
      <tr className="hover-row" key={index}>
      <th>{index+1}</th>
      <td>{(item.capital + item.interest).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      <td>{item.capital.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      <td>{item.interest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      <td>{item.remain.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
    </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Table;
