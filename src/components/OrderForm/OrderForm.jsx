import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import css from './OrderForm.module.css';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  bookingDate: Yup.date().required('Select a date'),
  comment: Yup.string().max(300, 'Max 300 characters'),
});

export default function OrderForm() {
  const [isOpen, setIsOpen] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    bookingDate: null,
    comment: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log('Form Data:', values);
    toast.success('Booking successful! Manager will contact you.', {
      duration: 3000,
      position: 'top-center',
    });
    resetForm();
  };

  const inputProps = {
    sx: {
      backgroundColor: '#f7f7f7',
      borderRadius: '12px',
      '& fieldset': { border: 'none' },
    },
  };

  const inputLabelProps = {
    sx: {
      color: '#8d929a',
      '&.Mui-focused': { opacity: 0 },
    },
  };

  const datePickerProps = {
    backgroundColor: '#f7f7f7',
    borderRadius: '12px',
    '& label': { color: '#8d929a' },
    '& fieldset': { border: 'none', endAdornment: null },
    '& textField': { endAdornment: null },
    '& .Mui-focused label': { opacity: 0 },
  };

  return (
    <>
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.orderForm}>
            <h2 className={css.formTitle}>Book your car now</h2>
            <p className={css.formText}>
              Stay connected! We are always ready to help you.
            </p>
            <div className={css.orderFormWrapper}>
              <Field
                as={TextField}
                label="Name*"
                name="name"
                variant="outlined"
                fullWidth
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
              <ErrorMessage
                className={css.errorMessage}
                name="name"
                component="div"
              />

              <Field
                as={TextField}
                label="Email*"
                name="email"
                variant="outlined"
                fullWidth
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
              <ErrorMessage
                className={css.errorMessage}
                name="email"
                component="div"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Booking date"
                  inputFormat="DD/MM/YYYY"
                  value={values.bookingDate}
                  onChange={date => setFieldValue('bookingDate', dayjs(date))}
                  sx={datePickerProps}
                  // disableOpenPicker
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  slotProps={{
                    textField: {
                      onClick: () => setIsOpen(true),
                    },
                  }}
                  slots={{
                    openPickerButton: () => null,
                  }}
                />
              </LocalizationProvider>

              <Field
                as={TextField}
                label="Comment"
                name="comment"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
            </div>
            <button className={css.formBtn} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
