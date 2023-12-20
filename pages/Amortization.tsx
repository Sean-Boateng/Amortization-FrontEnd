
import InputForm from '@/components/InputForm';
import Table from '@/components/Table';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Loan, LoanInstance } from 'loanjs';
import CustomPay from './CustomPay';
import Table2 from '@/components/Table2';


const Amortization = () => {
  const [loan, setLoan] = useState<LoanInstance | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [customLoan, setCustomLoan] = useState<LoanInstance | null>(null);
  const [customRate, setCustomRate] = useState<number | null>(null);
  const [showCustomPay, setShowCustomPay] = useState(false);
  const [customAmortizationSchedule, setCustomAmortizationSchedule] = useState([]);


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
  

      const cAmortizationSchedule = (data:any) => {
        setCustomAmortizationSchedule(data);
        console.log('est', customAmortizationSchedule)
      };
      const cLoan = (loan:any ) => {
        setCustomLoan(loan);
      };
      const cRate = (rate:any ) => {
        setCustomRate(rate);
      };

    return (
      <div style={{marginLeft:'40px', marginRight:"40px",fontFamily: 'Pt Sans, sans-serif'}}>
        
        <nav className="text-left text-5xl font-thin font-sans-serif sm:text-left text-10xl font-bold">
          Amortization Schedule <span className="text-purple-700">Calculator</span> 
        </nav>

        <p style={{textAlign:'left', fontFamily: 'Pt Sans, sans-serif', color:'grey'}}> 
        
        Welcome to Amortization Schedule Calculator, your go-to platform for seamless amortization schedule calculations and personalized financial planning.
        With our intuitive tools, you can effortlessly, generate detailed amortization schedules tailored to your specific needs. Our automated calculations 
        swiftly compute the schedule based on your initial inputs, ensuring accuracy and efficiency in tracking your loan payments over time.
        </p>

        
        


        <div>
          {showCustomPay ? 
            <div style={{marginTop:'40px'}} className=" sm:flex sm:space-x-10">   
              <div className=" sm:w-1/3 ">
                <CustomPay loan={cLoan} rate={cRate} updateSchedule={cAmortizationSchedule}/> 
                <div style={{color:'grey', fontWeight:'20px',marginTop:'30px'}} className="text-center sm:text-left">
                  Click to generate automated payment<br/> schedule 
                </div>
                <div className='flex justify-center sm:block '>
                  <button onClick={handleToggle}  className="btn btn-outline btn-primary" style={{marginTop:'10px', marginBottom:'15px'}}>Click</button>
                </div>
                
              </div>
              {customAmortizationSchedule.length>0 &&(
                <div className="sm:w-2/3">
                  <div className="flex justify-start">
                    <Table2 loan={customLoan} rate={customRate} schedule={customAmortizationSchedule}/>
                  </div> 
                </div>
              
              )}
            </div> 

            
            :
           
            <div className=" sm:flex sm:space-x-10" style={{marginTop:'40px'}}>
              <div className="  sm:w-1/3 ">
                <div>
                  <InputForm onFormSubmit={handleFormSubmit} onReset={handleReset}/> 
                  <div style={{color:'grey', fontWeight:'20px', marginTop:'30px', }} className="text-center sm:text-left">
                    Click to generate custom payment<br/> schedule
                  </div>
                  <div className='flex justify-center sm:block '>
                    <button onClick={handleToggle} className="btn btn-outline btn-primary " style={{marginTop:'10px', marginBottom:'15px'}}>Click</button>
                  </div>
                </div>
              </div>
            
              <div className="sm:w-2/3">
                <div className="flex justify-start">
                  <Table loan={loan} rate={rate}/>
                </div>
              </div>
            </div>
          }
              
        </div>

        
        
        
        
      </div>
      
    );
  }
  export default Amortization;


      