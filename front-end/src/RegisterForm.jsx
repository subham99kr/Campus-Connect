import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


export default function RegisterForm() {
    const [formData, setformData] = useState({
        Name: "",
        Admission_No: "",
        Email: "",
        Username: "",
        Password: ""
    });
    const handleChange = (evt) => {
        const fieldName = evt.target.name;
        const value = evt.target.value;
        setformData((currdata) => ({
            ...currdata,
            [fieldName]: value,
        }));
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`Submitted by ${formData.Username}`);
    };

    return (
        <>
            <h1>Registration Form</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Admission_No"
                        name="Admission_No"
                        value={formData.Admission_No}
                        onChange={handleChange}
                    />
                    <TextField
                        required id="outlined-password-input"
                        label="Email"
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Username"
                        name="Username"
                        value={formData.Username}
                        onChange={handleChange}
                    />
                    <TextField
                        required id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                    />
                </div>
            </Box>
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </>
    );
}
