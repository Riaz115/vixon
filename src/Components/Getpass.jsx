import React, { useState } from 'react';
import CustomTextField from './CustomTextfield';
import {
  Checkbox,
  Button,
  FormControlLabel,
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';

function Getpass() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    number: '',
  });
  const [errors, setErrors] = useState({});

  const inputFields = [
    { type: 'text', label: 'First Name', name: 'firstName', required: true, unique: false },
    { type: 'text', label: 'Last Name', name: 'lastName', required: true, unique: false },
    { type: 'email', label: 'Email', name: 'email', required: true, unique: true },
    { type: 'date', label: 'Date of Birth', name: 'dob', InputLabelProps: { shrink: true }, required: true, unique: false },
    { type: 'number', label: 'Number', name: 'number', required: true, unique: false },
  ];
  
  const [showTerms, setShowTerms] = useState(false);
  const handleToggleTerms = () => {
    setShowTerms((prevShowTerms) => !prevShowTerms);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  const validateForm = () => {
    let tempErrors = {};
    inputFields.forEach((field) => {
      if (field.required && !formValues[field.name]) {
        tempErrors[field.name] = `${field.label} is required`;
      }
      if (field.unique && field.name === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formValues.email)) {
          tempErrors.email = 'Email is not valid';
        }
        // Add logic to check if the email already exists (if applicable)
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      //// //console.log   .log('Form submitted successfully', formValues);
    } else {
      //// //console.log   .log('Form has errors', errors);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-4 flex justify-center bg-[#1294f2]">
        <img className="h-10" src="https://cdn.digitalwallet.cards/templates/320232/logo.png" alt="Logo" />
      </div>
      <Container maxWidth="sm" className="flex flex-col items-center justify-center py-10">
          <p  className="text-2xl text-center  my-8">
            Quasi quisquam sit q
          </p>
        <Box className="bg-white p-8 rounded-lg shadow-lg w-full">
          <form onSubmit={handleSubmit}>
            {inputFields.map((field, index) => (
              <div className="mb-4" key={index}>
                <CustomTextField
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  required={field.required}
                  unique={field.unique}
                  value={formValues[field.name]}
                  onChange={handleInputChange}
                  error={Boolean(errors[field.name])}
                  helperText={errors[field.name]}
                  {...field}
                />
              </div>
            ))}
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: '#70e000',
                    '&.Mui-checked': {
                      color: '#70e000',
                    },
                  }}
                />
              }
              label="I have read and accept the terms of use."
              className="mb-2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: '#70e000',
                    '&.Mui-checked': {
                      color: '#70e000',
                    },
                  }}
                />
              }
              label="Consectetur molestias."
              className="mb-6"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#000000',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#333333',
                },
                textTransform: 'none',
                padding: '10px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src="/assets/pwa.svg" alt="PWA Icon" className="h-6 w-6 mr-2" />
              Install on the Home screen
            </Button>
            <Box
              onClick={handleToggleTerms}
              className="mt-5"
              sx={{
                textTransform: 'none',
                color: '#000',
                borderColor: '#000',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                mt: 5,
                padding: '10px',
                border: '2px solid gray',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <span>Terms of use</span> <span className="text-red">▽</span>
            </Box>
            {showTerms && (
              <Grid className="mt-2 my-4 p-4 border">
                <Grid item xs={12}>
                  <Box
                    fullWidth
                    onClick={() => handleButtonClick('Aut aut molestiae lanbn')}
                    sx={{
                      textTransform: 'none',
                      color: '#000',
                      borderColor: '#000',
                      margin: '4px',
                    }}
                  >
                    Aut aut molestiae lanbn
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    fullWidth
                    onClick={() => handleButtonClick('Detailed terms of use')}
                    sx={{
                      textTransform: 'none',
                      color: '#1294f2',
                      margin: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Detailed terms of use
                  </Box>
                </Grid>
              </Grid>
            )}
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default Getpass;
