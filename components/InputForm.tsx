import React, { useState,useRef } from 'react';

type InputPayProps = {
  list: (data: any) => void; 
  loan: (data: any) => void; 
  rate: (data: any) => void; 
  onReset: () => void;
};

interface AmortizationSchedule {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const InputForm: React.FC<InputPayProps> = ({list,loan,rate, onReset }) => {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [interestRate, setInterestRate] = useState<number | null>(null);
  const [term, setTerm] = useState<number | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<
    { period: number; payment: number; principal: number; interest: number; balance: number }[]
  >([]);



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
      console.log(loanAmount,loanTermMonths,interestRate)
    return schedule;
  }





  const modalRef = useRef<HTMLDialogElement>(null); 

  function openM() {
      modalRef.current?.showModal();
    }


  const handleSubmit = (e: React.FormEvent) => {
    setSubmitted(true)
    e.preventDefault();
    setSubmitted(true)
    if (loanAmount == null) {
      e.preventDefault();
      setMessage('Please enter loan amount. Value must be greater than $0');
      openM()
    } 
    else if (term == null) {
      e.preventDefault();
      setMessage('Please enter loan term, in months.');
      openM()
    } 
    else if (interestRate == null) {
      e.preventDefault();
      setMessage('Please enter loan interest rate. Please enter 0 if there is none.');
      openM()
    } 
  
    else{
      setSubmitted(false)
      let run = calculateAmortizationSchedule(Number(loanAmount),Number(interestRate),Number(term))
      console.log('run', run)
      list(run)
    }};

  const handleReset = () => {
    setSubmitted(false)
    setLoanAmount(null)
    setTerm(null)
    setInterestRate(null)
    list([])
    onReset();
  };

  const hideModal = () => {
    if (modalRef.current) {
      modalRef.current.close();

    }
  };
  const styleWithFonts = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    fontFamily: 'Pt Sans, sans-serif',
    fontWeight: 700,
  };
 
  return (
    <div>
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
              name="principal"
              placeholder="$"
              className="input input-ghost max-w-xs focus:ring-0 focus:bg-transparent"
              value={loanAmount === null ? '' : loanAmount}
              onChange={(e) => setLoanAmount(e.target.value === '' ? null : Number(e.target.value))}
              style={{width:'100%'}}
              step=".01"

            />
          </div>
        </div>


        <div style={styleWithFonts}>
          <div style={{display:'flex', flexDirection:'column',marginBottom:'10px', position: 'relative'}}>
            <div style={{display:'flex', flexDirection:'row'}}>
              <label style={{marginBottom:'5px'}}>Loan Term </label>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info" style={{marginLeft:'210px'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </label>
                <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-blue-100  rounded-box w-64">
                  <div className="card-body">
                    <h2 className="card-title">Number of years</h2> 
                    <p>How many years do you have to pay the loan?</p>
                  </div>
                </div>
              </div>
            </div>
            

            <input
              type="number"
              name="months"
              placeholder=" 10"
              className="input input-ghost max-w-xs focus:ring-0 focus:bg-transparent"
              value={term === null ? '' : term}
              onChange={(e) => setTerm(e.target.value === '' ? null : Number(e.target.value))}
              style={{width:'100%'}}
              step=".01"

            />
            <span style={{ position: 'absolute', right: '15px', top: '65%', transform: 'translateY(-50%)' }}>months</span>
          </div>
        </div>


        <div style={styleWithFonts}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', position: 'relative' }}>
            <div style={{display:'flex', flexDirection:'row'}}>
              <label style={{marginBottom:'5px'}}>Interest Rate</label>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info" style={{marginLeft:'190px'}}>
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
              name="interestRate"
              value={interestRate === null ? '' : interestRate}
              onChange={(e) => setInterestRate(e.target.value === '' ? null : Number(e.target.value))}
              style={{ width: '100%' }}
              step=".01"

            />
            <span style={{ position: 'absolute', right: '15px', top: '65%', transform: 'translateY(-50%)' }}>%</span>
          </div>
        </div>

          <div style={{display:'flex', flexDirection:'row'}}>
            <button type="submit" className="btn btn-outline btn-primary">Calculate</button>
            <button className="btn btn-outline" onClick={handleReset} style={{marginLeft:'105px'}}>Reset</button> 
          </div>
       
      </form>
    </div>

  );
};

export default InputForm;


