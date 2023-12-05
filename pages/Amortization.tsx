
import InputForm from '@/components/InputForm';
import Table from '@/components/Table';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Loan, LoanInstance } from 'loanjs';
import CustomPay from './CustomPay';


const Amortization = () => {
  const [loan, setLoan] = useState<LoanInstance | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [showCustomPay, setShowCustomPay] = useState(false);

  const handleToggle = () => {
    setShowCustomPay((prevShowCustomPay) => !prevShowCustomPay);
  };


  const handleFormSubmit = (formData: Record<string, string>) => {
    const principal = parseFloat(formData.principal);
    const months = parseInt(formData.months);
    const interestRate = parseFloat(formData.interestRate);

    const newLoan = Loan(principal, months, interestRate, 'annuity');

    setLoan(newLoan);
    setRate(interestRate)
  };

  const handleReset = () => {
    setLoan(null);
    
  };
      
      const styleWithFonts = {
        fontFamily: 'Pt Sans, sans-serif',
        fontWeight: 700,
      };
  
    return (
      <div style={{marginLeft:'40px', marginRight:"40px",fontFamily: 'Pt Sans, sans-serif'}}>
        
        <nav 
          style={{textAlign:'left',fontSize:'50px',fontFamily: 'Pt Sans, sans-serif', fontWeight:'100px' }}>
          Amortization Schedule <span style={{color:' #6419E6'}}>Calculator</span> 
        </nav>
        <p style={{textAlign:'left', fontFamily: 'Pt Sans, sans-serif', color:'grey'}}> 
        
        Welcome to Amortization Schedule Calculator, your go-to platform for seamless amortization schedule calculations and personalized financial planning.
        With our intuitive tools, you can effortlessly generate detailed amortization schedules tailored to your specific needs. Our automated calculations 
        swiftly compute the schedule based on your initial inputs, ensuring accuracy and efficiency in tracking your loan payments over time.
        </p>

      
        <div style={{position: 'fixed', bottom: '140px', left: '38px', zIndex: '999'}}>
          {showCustomPay?
          <div>
            <div style={{color:'grey', fontWeight:'20px'}}>
            Click to generate custom payment<br/> schedule
            </div>
            <button onClick={handleToggle}  className="btn btn-outline btn-primary" style={{marginTop:'10px'}}>Click</button>

          </div>
            
            :
            <div>
              <div style={{color:'grey', fontWeight:'20px'}}>
                Click to generate automated payment<br/> schedule
              </div>
              <button onClick={handleToggle}  className="btn btn-outline btn-primary" style={{marginTop:'10px'}}>Click</button>
            </div>
          }
                   
        </div>
          
        <div>
          {showCustomPay ? 
           <div style={{marginTop:'40px'}}>
           <CustomPay/>
         </div>

            
            :
           
            <div style={{marginTop:'40px'}} className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">   
              <div style={{backgroundColor:''}}>
                <InputForm onFormSubmit={handleFormSubmit} onReset={handleReset}/> 
               
              </div>

              <div className="col-span-2"
                style={{marginLeft:'10px', display:'flex', justifyContent:'flex-start'}} >
                <Table loan={loan} rate={rate}/>
              </div>
            </div>
          }
              
        </div>
        
        
      </div>
      
    );
  }
  export default Amortization;


      