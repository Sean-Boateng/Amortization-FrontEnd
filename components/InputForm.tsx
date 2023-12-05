import React, { useState,useRef } from 'react';

type OnFormSubmitType = (data: Record<string, string>) => void;

interface InputFormProps {
  onFormSubmit: OnFormSubmitType;
  onReset: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ onFormSubmit, onReset }) => {
  const initialFormData = {
    principal: '',
    months: '',
    interestRate: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const modalRef = useRef<HTMLDialogElement>(null); 

  function openM() {
      modalRef.current?.showModal();
    }


  const handleSubmit = (e: React.FormEvent) => {
    setSubmitted(true)
    e.preventDefault();
    setSubmitted(true)
    if (formData.principal == '') {
      e.preventDefault();
      setMessage('Please enter loan amount. Value must be greater than $0');
      openM()
    } 
    else if (formData.months == '') {
      e.preventDefault();
      setMessage('Please enter loan term, in months.');
      openM()
    } 
    else if (formData.interestRate == '') {
      e.preventDefault();
      setMessage('Please enter loan interest rate. Please enter 0 if there is none.');
      openM()
    } 
  
    else{setSubmitted(false)
    const principalValue = parseFloat(formData.principal);
    const monthsValue = parseInt(formData.months);
    let interestRateValue = parseFloat(formData.interestRate);
  
    const originalInterestRate = formData.interestRate;
  
    if (isNaN(interestRateValue) || interestRateValue === 0 || formData.interestRate.trim() === '') {
      interestRateValue = 0.00001; 
    }
  
    onFormSubmit({
      principal: isNaN(principalValue) ? '' : principalValue.toString(),
      months: isNaN(monthsValue) ? '' : monthsValue.toString(),
      interestRate: interestRateValue.toString(),
      originalInterestRate, 
    });}
  };

  const handleReset = () => {
    setSubmitted(false)
    setFormData(initialFormData);
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
                  <p>Please do not include "$","/", or any letters</p>
                </div>
              </div>
            </div>
            </div>

            <input
              type="number"
              name="principal"
              placeholder="$"
              className="input input-ghost max-w-xs focus:ring-0 focus:bg-transparent"
              value={formData.principal}
              onChange={handleChange}
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
              value={formData.months}
              onChange={handleChange}
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
                    <p>DO NOT ADD '%' SIGN</p>
                  </div>
                </div>
              </div>
            </div>

            <input
              type="number"
              placeholder="0.0"
              className="input input-ghost max-w-xs focus:ring-0 focus:bg-transparent"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
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


