import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setformData] = React.useState({
        Username: "",
        Password: ""
    })
    const handleClickShowPassword = () => setShowPassword((show) => !show);
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
            <h2>{formData.Username}</h2>
            <h2>{formData.Password}</h2>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

                <div>
                    <h1>Login-Form</h1>
                    <TextField
                        label="Username"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        value={formData.Username}
                        name='Username'
                        onChange={handleChange}
                    />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            value={formData.Password}
                            name='Password'
                            onChange={handleChange}
                        />
                    </FormControl>
                </div>
            </Box>
            <Button onClick={handleSubmit} variant="contained">Submit</Button>

        </>
    );
}