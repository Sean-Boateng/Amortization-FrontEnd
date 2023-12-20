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


const styleWithFonts = {
  fontFamily: 'Pt Sans, sans-serif',
  fontWeight: 700,
};
  return (
    <div style={styleWithFonts} className="container mx-auto px-1 sm: px-2 lg:px-3">

      <div className='rectangle2 gap-1  sm:rectangle ' >
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <div>
            <div className="sm:hidden text-left">SUMMARY</div>
            <div className="hidden sm:block text-center">SUMMARY</div>
          </div>
          
          {plural ? (
            <div>
              <div className="sm:hidden text-right"># of Payments: {totalInstallments}</div>
              <div className="hidden sm:block text-center"># of Payments: {totalInstallments}</div>
            </div>
          ) : (
            <div >
              <div className="sm:hidden text-right"># of Payments: {totalInstallments}</div>
              <div className="hidden sm:block text-center">{totalInstallments} Payment</div>
            </div>
          )}

        </div>
        <div className='underline'></div>

         <div className="card-body flex-col sm:flex-row justify-between">
            <div style={{ marginTop:'10px'}}>
              <h3  style={{color:'#6419E6', fontSize:'14px'}}>Total Cost</h3>
              <p style={{fontSize:'16px'}}>${String(loan.sum).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
            <div style={{display:'flex', flexDirection:'column',marginTop:'10px'}}>
              <h3  style={{color:'#6419E6', fontSize:'14px'}}>Total Interest</h3>
              <p style={{fontSize:'16px'}}>${String(loan.interestSum).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
            <div style={{display:'flex', flexDirection:'column',marginTop:'10px'}}>
              <h3  style={{color:'#6419E6', fontSize:'14px'}}>Avg. Monthly Payment</h3>
              <p style={{fontSize:'16px'}}>${(averageMonthlyPayment)}</p>
            </div>
            
            <button
            style={{marginTop:'10px'}}
              className='btn btn-outline btn-primary'
              onClick={handleExport}
            >
              Export to Excel
            </button>
            
          </div>
      </div>



      <div className="overflow-x-auto table-container">
        <table className="table-xs sm:table mt-1">

          <thead>
            <tr>
              <th className="hidden sm:table-cell">Month</th>
              <th>Monthly Payment</th>
              <th>Principal Payment</th>
              <th>Interest Payment</th>
              <th>Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
          {loan.installments.map((item, index) => (
            
            <tr className="hover-row" key={index}>
            <th className="hidden sm:table-cell">{index+1}</th>
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
