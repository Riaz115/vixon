import React from 'react';
import { TextField } from '@mui/material';

function CustomTextField({ type, label, name, ...props }) {
    return (
        <TextField
            type={type}
            label={label}
            name={name}
            variant="outlined"
            fullWidth
            {...props}
        />
    );
}

export default CustomTextField;
