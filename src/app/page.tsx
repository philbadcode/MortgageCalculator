"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

type NumericInputEvent = ChangeEvent<HTMLInputElement>;

export default function Home() {
  const [principal, setPrincipal] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');

  const calculateMortgage = () => {
    const principalAmount = parseFloat(principal);
    const rate = parseFloat(interestRate) / 100 / 12;
    const termInMonths = parseInt(loanTerm, 10) * 12;

    const payment = principalAmount * (rate * Math.pow(1 + rate, termInMonths)) / (Math.pow(1 + rate, termInMonths) - 1);

    if (isFinite(payment)) {
      setMonthlyPayment(payment.toFixed(2));
    } else {
      setMonthlyPayment('Invalid input');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    calculateMortgage();
  };

  const handleNumericInputChange = (setter: (value: string) => void) => (e: NumericInputEvent) => {
    setter(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Mortgage Calculator</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
        <div className="mb-4">
          <label htmlFor="principal-amount" className="block text-sm font-bold text-gray-700 mb-1">
            Principal Amount:
          </label>
          <input
            id="principal-amount"
            type="number"
            value={principal}
            onChange={handleNumericInputChange(setPrincipal)}
            min="0"
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="interest-rate" className="block text-sm font-bold text-gray-700 mb-1">
            Interest Rate (% per annum):
          </label>
          <input
            id="interest-rate"
            type="number"
            value={interestRate}
            onChange={handleNumericInputChange(setInterestRate)}
            step="0.01"
            min="0"
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="loan-term" className="block text-sm font-bold text-gray-700 mb-1">
            Loan Term (years):
          </label>
          <input
            id="loan-term"
            type="number"
            value={loanTerm}
            onChange={handleNumericInputChange(setLoanTerm)}
            min="1"
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
          Calculate
        </button>
      </form>
      {monthlyPayment && <p className="mt-4 text-lg font-semibold">Monthly Payment: ${monthlyPayment}</p>}
    </div>
  );
}