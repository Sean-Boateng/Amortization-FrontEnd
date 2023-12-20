import React, { useEffect } from 'react';
import { LoanInstance } from 'loanjs';
import { ExcelFile, ExcelSheet, ExcelColumn } from 'react-data-export';
import ExcelJS from 'exceljs';


interface Table2Props {
  schedule: any | null
  loan: any | null
  rate: any | null

}

const Table2: React.FC<Table2Props> = ({schedule,loan,rate}) => {
  if (!schedule) {
    return null;
  }
  console.log(schedule)
  const totalMonthlyPayments = schedule.reduce(
    (total:any, payment:any) => total + payment.monthlyPayment,
    0
  );

  let total = Number((totalMonthlyPayments).toFixed(2))
  let totalInt = Number((totalMonthlyPayments-loan).toFixed(2))
  
  console.log('Total Monthly Payments:', totalMonthlyPayments);
  console.log('Loan:', loan);

  let months = schedule.length
  console.log('Test', months)
  let averageMonthlyPayment = Number((totalMonthlyPayments/months).toFixed(2));
  let plural = months > 1
  





const handleExport = () => {
  // Create a new workbook and add a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Loan Installments');

  // Add headers
  worksheet.addRow(['Loan Amount','Months', 'Interest']);
  worksheet.addRow([loan,months,rate?.toFixed(2)]);
  worksheet.addRow(['Month', 'Monthly Payment', 'Principal Payment', 'Interest Payment', 'Remaining Balance']);

  // Add data
  schedule.forEach((item:any, index:any) => {
    Number((item.monthlyPayment).toFixed(2))
    worksheet.addRow([index + 1, Number((item.monthlyPayment).toFixed(2)), Number((item.principal).toFixed(2)), Number((item.interest).toFixed(2)), Number((item.balance).toFixed(2))]);
  });

  // Create a blob from the workbook and trigger a download
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
    <div style={styleWithFonts} className="container mx-auto px-1 sm: px-2 lg:px-3"  >


<div className='rectangle2 gap-1  sm:rectangle ' >
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <div>
            <div className="sm:hidden text-left">SUMMARY</div>
            <div className="hidden sm:block text-center">SUMMARY</div>
          </div>
          
          {plural ? (
            <div>
              <div className="sm:hidden text-right"># of Payments: {months}</div>
              <div className="hidden sm:block text-center"># of Payments: {months}</div>
            </div>
          ) : (
            <div >
              <div className="sm:hidden text-right"># of Payments: {months}</div>
              <div className="hidden sm:block text-center">{months} Payment</div>
            </div>
          )}

        </div>
        <div className='underline'></div>

         <div className="card-body flex-col sm:flex-row justify-between">
            <div style={{ marginTop:'10px'}}>
              <h3  style={{color:'#6419E6', fontSize:'14px'}}>Total Cost</h3>
              <p style={{fontSize:'16px'}}>${String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
            <div style={{display:'flex', flexDirection:'column',marginTop:'10px'}}>
              <h3  style={{color:'#6419E6', fontSize:'14px'}}>Total Interest</h3>
              <p style={{fontSize:'16px'}}>${String(totalInt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
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

        {/* <div className='rectangle'>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',marginBottom:'5px',}}>
                <div>SUMMARY</div>
                {plural ? (
        <div># of Payments: {months} months</div>
      ) : (
        <div># of Payments: {months} month</div>
      )}
                </div>
                <div className='underline'></div>

                <div className="card-body" style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <h3  style={{color:'#6419E6', fontSize:'14px'}}>Total Cost</h3>
                    <p style={{fontSize:'16px'}}>${String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    </div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                    <h3  style={{color:'#6419E6', fontSize:'14px'}}>Total Interest</h3>
                    <p style={{fontSize:'16px'}}>${(String(totalInt).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</p>
                    </div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                    <h3  style={{color:'#6419E6', fontSize:'14px'}}>Avg. Monthly Payment</h3>
                    <p style={{fontSize:'16px'}}>${(String(avg).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</p>
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
            </div> */}







        <div className="overflow-x-auto table-container" >
            <table className="table-xs sm:table mt-1" >
                <thead>
                    <tr>
                    <th className="hidden sm:table-cell" style={{textAlign:'left'}}>Month</th>
                    <th style={{textAlign:'left'}}>Monthly Payment</th>
                    <th style={{textAlign:'left'}}>Principal Payment</th>
                    <th style={{textAlign:'left'}}>Interest Payment</th>
                    <th style={{textAlign:'left'}}> Remaining Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((entry:any, index:any) => (
                    <tr  className="hover-row" key={index}>
                        <td className="hidden sm:table-cell" style={{textAlign:'left'}}>{entry.month}</td>
                        <td style={{textAlign:'left'}}>{entry.monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td style={{textAlign:'left'}}>{entry.principal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td style={{textAlign:'left'}}>{entry.interest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td style={{textAlign:'left'}}>{entry.balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      
      

      

    {/* <div className="overflow-x-auto page-container">
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
    </div> */}

    </div>
  );
};

export default Table2;
