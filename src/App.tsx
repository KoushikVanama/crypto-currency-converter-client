import * as Yup from 'yup';
import Select from 'react-select';
import { FieldInputProps, FormikProps } from 'formik';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import "./index.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

interface CryptoOption {
  value: string;
  label: string;
}

interface CurrencyOption {
  value: string;
  label: string;
}

const validationSchema = Yup.object().shape({
  crypto: Yup.string().required('Crypto is required'),
  currency: Yup.string().required('Currency is required'),
  amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
});

const initialValues = {
  crypto: '',
  currency: '',
  amount: '',
};

const App = () => {
  const [cryptoOptions, setCryptoOptions] = useState<CryptoOption[] | null>(null);
  const [currencyOptions, setCurrencyOptions] = useState<CurrencyOption[] | null>(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleSubmit = async (values: any) => {
    const { crypto, currency, amount } = values;
    const response = await axios.get(`${apiUrl}/api/convert-currency`, {
      params: {
        sourceCrypto: crypto,
        amount: amount,
        targetCurrency: currency,
      }
    });
    setConvertedAmount(response?.data?.convertedAmount);
  }

  useEffect(() => {
    const getCurrenicesAndCryptos = async () => {
      try {
        const [cryptos, currencies] = await Promise.all(
          [
            axios.get(`${apiUrl}/api/top-cryptos`),
            axios.get(`${apiUrl}/api/accepted-currencies`)
          ]
        );
        const transformCryptos = cryptos?.data?.map((item: any) => ({
          value: item.id,
          label: item.id,
        }));
        const transformCurrencies = currencies?.data?.map((item: any) => ({
          value: item,
          label: item,
        }));
        setCryptoOptions(transformCryptos);
        setCurrencyOptions(transformCurrencies);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    }
    getCurrenicesAndCryptos();
  }, []);

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md'>
      <h2 className="text-2xl font-semibold mb-4 text-center">Crypto Currency Converter</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ resetForm, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="crypto" className="block text-sm font-medium text-gray-600">
                Crypto:
              </label>
              <Field name="crypto">
                {({ field, form }: { field: FieldInputProps<any>; form: FormikProps<any> }) => (
                  cryptoOptions && (
                    <Select
                      id="crypto"
                      name="crypto"
                      options={cryptoOptions || []}
                      onChange={(selectedOption) => form.setFieldValue('crypto', selectedOption?.value || '')}
                      value={cryptoOptions.find(option => option.value === field.value) || null}
                    />
                  )
                )}
              </Field>
              <ErrorMessage name="crypto" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="currency" className='block text-sm font-medium text-gray-600'>
                Currency:
              </label>
              <Field name="currency">
                {({ field, form }: { field: FieldInputProps<any>; form: FormikProps<any> }) => (
                  currencyOptions && (
                    <Select
                      id="currency"
                      name="currency"
                      options={currencyOptions || []}
                      onChange={(option) => form.setFieldValue("currency", option?.value || '')}
                      value={currencyOptions.find((option) => option.value === field.value) || null}
                    />
                  ))}
              </Field>
              <ErrorMessage name="currency" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor='amount' className="block text-sm font-medium text-gray-600">
                Amount:
              </label>
              <Field type="number" id="amount" name="amount" className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
            </div>
            <div className='flex justify-around'>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-300">Submit</button>
              <button
                type="button"
                className="bg-zinc-500 text-white px-4 py-2 rounded-md hover:bg-zinc-600 focus:outline-none focus:border-zinc-300"
                onClick={() => {
                  resetForm();
                  setFieldValue('crypto', '');
                  setFieldValue('currency', '');
                  setConvertedAmount(null);
                }}
              >Reset</button>
            </div>
          </Form>
        )}
      </Formik>
      <div className='mt-2'>
        <h5>Converted Amount: {convertedAmount} </h5>
      </div>
    </div>
  );
}

export default App;
