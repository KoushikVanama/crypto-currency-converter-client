import * as Yup from 'yup';
import Select from 'react-select';
import { FieldInputProps, FormikProps } from 'formik';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import "./index.css";

const cryptoOptions = [
  { value: 'BTC', label: 'Bitcoin' },
  { value: 'ETH', label: 'Ethereum' },
];

const currencyOptions = [
  { value: 'USD', label: 'US Dollar' },
  { value: 'EUR', label: 'Euro' },
];

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
  const handleSubmit = (values: any) => {
    console.log("inside submit")
    console.log(values)
  }

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md'>
      <h2 className="text-2xl font-semibold mb-4 text-center">Crypto Currency Converter</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        debug
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="crypto" className="block text-sm font-medium text-gray-600">
              Crypto:
            </label>
            <Field name="crypto">
              {({ field, form }: { field: FieldInputProps<any>; form: FormikProps<any> }) => (
                <Select
                  id="crypto"
                  name="crypto"
                  options={cryptoOptions}
                  onChange={(selectedOption) => form.setFieldValue('crypto', selectedOption?.value || '')}
                  value={cryptoOptions.find(option => option.value === field.value)}
                />
              )}
            </Field>
          </div>
          <ErrorMessage name="crypto" component="div" className="text-red-500 text-sm" />
          <div>
            <label htmlFor="currency" className='block text-sm font-medium text-gray-600'>
              Currency:
            </label>
            <Field name="currency">
              {({ field, form }: { field: FieldInputProps<any>; form: FormikProps<any> }) => (
                <Select
                  id="currency"
                  name="currency"
                  options={currencyOptions}
                  onChange={(option) => form.setFieldValue("currency", option?.value || '')}
                  value={currencyOptions.find((option) => option.value === field.value)}
                />
              )}
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Submit</button>
        </Form>
      </Formik>
      <div className='mt-2'>
        <h5>Converted Amount: {}</h5>
      </div>
    </div>
  );
}

export default App;
