
import Table2 from '@/components/Table2';
import { Solitreo } from 'next/font/google';
import React, { useEffect, useRef, useState } from 'react';

const AmortizationTable: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [interestRate, setInterestRate] = useState<number | null>(null);
  const [customPayment, setCustomPayment] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [amortizationSchedule, setAmortizationSchedule] = useState<
    { month: number; monthlyPayment: number; principal: number; interest: number; balance: number }[]
  >([]);

  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalMonths, setTotalMonths] = useState(0);
  const [submitted, setSubmitted] = useState(false);


  const calculateAmortizationSchedule = (interest:any) => {
    if (loanAmount === null  || interestRate == null ||customPayment === null) {  
      return;
    }
  
    let monthlyInterestRate = ((interestRate) / 12) / 100;
    

    let remainingBalance = loanAmount;
    let month = 1;
    



    const schedule: { month: number; monthlyPayment: number; principal: number; interest: number; balance: number }[] = [];
    if (interestRate === 0) {
        let totalMonthlyPayments = 0;
        let totalInterestPaid = 0;   
        while (remainingBalance > 0.01) {
          
          let principalPayment = customPayment;
          let interestPayment = 0;
    
          if (remainingBalance > customPayment) {

            interestPayment = remainingBalance * monthlyInterestRate;
            principalPayment = customPayment - interestPayment;
            remainingBalance -= principalPayment;
            totalMonthlyPayments += principalPayment;
            totalInterestPaid = 0;
            schedule.push({
                month,
                monthlyPayment: customPayment,
                principal: principalPayment,
                interest: interestPayment,
                balance: remainingBalance,
              });
          } else {
            
            interestPayment = remainingBalance * monthlyInterestRate;
            principalPayment = remainingBalance;
            remainingBalance = 0
            totalMonthlyPayments += principalPayment;
            totalInterestPaid = 0;
            schedule.push({
                month,
                monthlyPayment: principalPayment + interestPayment,
                principal: principalPayment,
                interest: interestPayment,
                balance: remainingBalance,
              });
            }
           
            month++;
        }
        setTotalMonths(month)
      }

  else{
    let totalMonthlyPayments = 0;
    let totalInterestPaid = 0;      
    while(remainingBalance > 0.01){
        
        
        if (remainingBalance > customPayment){
            
            if(isNaN(monthlyInterestRate)){
                let interestPayment = remainingBalance * monthlyInterestRate;
                let principalPayment = customPayment - interestPayment;
                 remainingBalance -= principalPayment
                 
                 schedule.push({
                        month,
                        monthlyPayment: customPayment,
                        principal: principalPayment,
                        interest: interestPayment,
                        balance: remainingBalance,
                      });
                      totalMonthlyPayments += customPayment;
                    totalInterestPaid += interestPayment;
            }
            let interestPayment = remainingBalance * monthlyInterestRate;
            let principalPayment = customPayment - interestPayment;
             remainingBalance -= principalPayment
             
             schedule.push({
                    month,
                    monthlyPayment: customPayment,
                    principal: principalPayment,
                    interest: interestPayment,
                    balance: remainingBalance,
                  });
                  totalMonthlyPayments += customPayment;
      totalInterestPaid += interestPayment;
      month++
        }

        if(remainingBalance < customPayment){
            let interestPayment = remainingBalance * monthlyInterestRate;
            let principalPayment = remainingBalance
            remainingBalance -= (principalPayment + interestPayment)
            schedule.push({
                month,
                monthlyPayment: principalPayment + interestPayment,
                principal: principalPayment,
                interest: interestPayment,
                balance: 0,
              });
              totalMonthlyPayments += customPayment;
                totalInterestPaid += interestPayment;
                month++
        }
        setTotalInterest(totalInterestPaid)
        setTotalCost(totalMonthlyPayments)
    }
    setTotalMonths(month)
  }
    

return setAmortizationSchedule(schedule);
};

const styleWithFonts = {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '10px',
        fontFamily: 'Pt Sans, sans-serif',
        fontWeight: 700,
      };


    const modalRef = useRef<HTMLDialogElement>(null); 

    function openM() {
        modalRef.current?.showModal();
      }


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitted(true)
    if (loanAmount === 0 || loanAmount === null) {
      e.preventDefault();
      setMessage('Please enter loan amount. Value must be greater than $0');
      openM()
    } 
   
    else if (customPayment === 0 || customPayment === null) {
        e.preventDefault();
        setMessage('Please enter desired monthly payment. Value must be greater than $0');
        openM()
    }
    else if (interestRate === null) {
        e.preventDefault();
        setMessage('Please enter loan interest rate. Please enter 0 if there is none');
        openM()
    }



    else {
        e.preventDefault();
        const interestRateValue: number = interestRate ?? 0;
        if (interestRateValue === 0 || Number.isNaN(interestRateValue)) {
          setInterestRate(0);
        }
        calculateAmortizationSchedule(interestRateValue);
        setSubmitted(false);
      }
  };

  const handleReset = () => {
    setSubmitted(false)
    setLoanAmount(null);
    setInterestRate(null);
    setCustomPayment(null);
    setAmortizationSchedule([]);
  };
  



      console.log('List',amortizationSchedule)

      const handleCloseModal = () => {
        setSubmitted(false);
      };
    
      const hideModal = () => {
        if (modalRef.current) {
          modalRef.current.close();

        }
      };

  return (
    <div className="flex">
        {submitted && 

        <dialog ref={modalRef} className="modal" style={{fontFamily: 'Pt Sans, sans-serif'}}>
        <div className="modal-box ">
          <h3 className="font-bold text-lg ">Oops!</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-green modal-button" onClick={hideModal}>
                Close
              </button>
            </form>
          </div>
        </div>
        </dialog>}
        




        <div className="form-container" >
            <form onSubmit={handleSubmit}>
                <div style={styleWithFonts}>
                    <div style={{display:'flex', flexDirection:'column',marginBottom:'10px'}}>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <label style={{marginBottom:'5px'}} >Loan Amount</label>

                            <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info" style={{marginLeft:'190px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </label>
                            <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-blue-100  rounded-box w-64">
                                <div className="card-body">
                                <h2 className="card-title">How much was the loan for</h2> 
                                <p>
  Please do not include &quot;$&quot;, &quot;/&quot;, or any letters
</p>
                                </div>
                            </div>
                            </div>
                            </div>

                            <input
                            type="number"
                            placeholder="$0"
                            className="input input-ghost max-w-xs focus:ring-0 focus:bg-transparent"
                            value={loanAmount === null ? '' : loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value === '' ? null : Number(e.target.value))}
                            style={{width:'100%'}}
                            />
                            
                    </div>
                </div>

                <div style={styleWithFonts}>
                                <div style={{display:'flex', flexDirection:'column',marginBottom:'10px'}}>
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                        <label style={{marginBottom:'5px'}} >Custom Amount</label>

                                        <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info" style={{marginLeft:'170px'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </label>
                                        <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-blue-100  rounded-box w-64">
                                            <div className="card-body">
                                            <h2 className="card-title">How much would you like to pay per cycle?</h2> 
                                            <p>
                                            Please do not include &quot;$&quot;, &quot;/&quot;, or any letters
                                            </p>
                                            </div>
                                        </div>
                                        </div>
                                        </div>

                                        <input
                                        type="number"
                                        placeholder="$0"
                                        className="input input-ghost max-w-xs focus:ring-0 focus:bg-transparent"
                                        value={customPayment === null ? '' : customPayment}
                                        onChange={(e) => setCustomPayment(e.target.value === '' ? null : Number(e.target.value))}
                                        style={{width:'305px'}}
                                        />
                                </div>
                </div>

                <div style={styleWithFonts} >
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', position: 'relative' }}>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <label style={{marginBottom:'5px'}}>Interest Rate (%)</label>

                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info" style={{marginLeft:'163px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </label>
                                <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-blue-100  rounded-box w-64">
                                    <div className="card-body">
                                        <h2 className="card-title">Loan Iterest Rate</h2> 
                                        <p>Please provide percentage amount</p>
                                        <p>DO NOT ADD &lsquo;%&lsquo; SIGN</p>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <input
                            type="number"
                            placeholder="0.0"
                            className="input input-ghost max-w-xs focus:ring-0 focus:bg-transparent"
                            value={interestRate === null ? '' : interestRate}
                            onChange={(e) => setInterestRate(e.target.value === '' ? null : Number(e.target.value))}
                            style={{ width: '305px' }}
                            />
                            <span style={{ position: 'absolute', right:'15px', top: '65%', transform: 'translateY(-50%)' }}>%</span>
                            
                    </div>
                </div>

                <button type="submit"  className="btn btn-outline btn-primary" >Calculate</button>
                <button onClick={handleReset} className="btn btn-outline" style={{ marginLeft:'110px'}}>Reset</button>
            </form>
        </div>


        {amortizationSchedule.length > 0 && (
            <div className="table-container">
                <Table2 schedule={amortizationSchedule} loan={loanAmount}  rate={interestRate}/>
            </div>
        )}
     
    </div>
  );
};


export default AmortizationTable;

