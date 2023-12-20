import React, { useEffect, useState } from 'react';
import { LoanInstance } from 'loanjs';
import { ExcelFile, ExcelSheet, ExcelColumn } from 'react-data-export';
import ExcelJS from 'exceljs';


interface TableProps {
  loan: LoanInstance | null;
  rate: number | null;
  list: any | null
}

const Table: React.FC<TableProps> = ({list,loan,rate}) => {

  if (!list) {
    return null;
  }
  const sumOfPayments = (list.reduce(
    (total:any, entry:any) => total + entry.payment,
    0).toFixed(2)
  );
  const sumOfInterest = (list.reduce(
    (total:any, entry:any) => total + entry.interest,
    0).toFixed(2)
  );
  const totalInstallments = list.length;
  const plural = totalInstallments > 1;

const averageMonthlyPayment = (sumOfPayments/ totalInstallments).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const handleExport = () => {

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Loan Installments');

  worksheet.addRow(['Loan Amount','Months', 'Interest']);
  worksheet.addRow([loan,totalInstallments,rate?.toFixed(2)]);
  worksheet.addRow(['Month', 'Monthly Payment', 'Principal Payment', 'Interest Payment', 'Remaining Balance']);

  list.installments.forEach((item:any, index:any) => {
    worksheet.addRow([item.period, item.payment, item.principal, item.interest, item.balance]);
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

const numberWithCommas = (value: number): string => {
  return value.toLocaleString('en-US');
};

let sumP = numberWithCommas(sumOfPayments)
let sumI = numberWithCommas(sumOfInterest)



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
              <p style={{fontSize:'16px'}}>${String(sumP).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
            <div style={{display:'flex', flexDirection:'column',marginTop:'10px'}}>
              <h3  style={{color:'#6419E6', fontSize:'14px'}}>Total Interest</h3>
              <p style={{fontSize:'16px'}}>${String(sumI).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
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
          {list.map((item:any, index:any) => (
            
            <tr className="hover-row" key={index}>
            <th className="hidden sm:table-cell">{index+1}</th>
            <td>{(item.payment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td>{item.principal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td>{item.interest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td>{item.balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Table;
