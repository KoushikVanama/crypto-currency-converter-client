import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useFormik } from 'formik';

const App = () => {
  const formik = useFormik({
    initialValues: { currency: "", amount: "", crypto: "" },
    onSubmit: values => {
      console.log("Form submitted", values);
    }
  });

  return (
    <div className="App text-white">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor='crypto'>
            Crypto:
          </label>
          <input name="crypto" onChange={formik.handleChange} value={formik.values.crypto} />
        </div>
        <div>
          <label htmlFor='currency'>
            Currency:
          </label>
          <input name="currency" onChange={formik.handleChange} value={formik.values.currency} />
        </div>
        <div>
          <label htmlFor='amount'>
            Amount:
          </label>
          <input type="number" name="amount" onChange={formik.handleChange} value={formik.values.amount} />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
