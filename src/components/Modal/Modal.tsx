
import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { Alert, MenuItem, NativeSelect, Select, SelectChangeEvent } from '@mui/material';


const StyledCardInfo = styled.div`
  background-color: transparent;
  border: 0.5px solid grey;
  border-radius: 10px;
  margin: 10px 0 10px 0;
  padding: 10px 0 20px 0;
`

const StyledCardMargin = styled.div`
    margin-left: 10px;
    margin-right: 10px;
`
const StyledSubmitBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledPassword = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`
interface ModalProps {
    open: boolean
    handleModalClose: () => void
    handleSubscribeOpen: () => void
  }
export const Modal: FunctionComponent<ModalProps> = ({
    open,
    handleModalClose,
    handleSubscribeOpen,
})=>{
    const [value, setValue] = useState('signup');
    const [signupForm, setSignupForm] = useState({})
    const [signinForm, setSigninForm] = useState({})
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
      setSigninForm({});
      setSignupForm({});
    };
    const handleFieldChange = (event: React.SyntheticEvent| SelectChangeEvent, fieldName: string, value: string | number) => {
        setSignupForm({
            ...signupForm,
            [fieldName]: value,
        });
      };
    // const handleSelectChange = () =
    const handleSigninFieldChange = (event: React.SyntheticEvent, fieldName: string, value: string | number) => {
        setSigninForm({
            ...signinForm,
            [fieldName]: value,
        });
    };
    const handleSignupFormSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5139/user/register', {...signupForm})
            if (response.status === 200) {
                alert('success');  
                handleSubscribeOpen();
            }
            else {
                alert(response.data.result)
            }
        }
        catch(err){
            alert(err)
        }
        // clear form data
        setSignupForm({});
        handleModalClose();
        
    }
    const handleSigninFormSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5139/user/login', {...signinForm})
            if (response.status === 200) {
                alert('success'); 
                handleSubscribeOpen(); 
            }
            else {
                alert(response.data.result)
            }
        }
        catch(err){
            alert(err)
        }
        // clear form data
        setSigninForm({});
        handleModalClose();
    }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleModalClose}
      >
            <TabContext value={value}>
                <TabList onChange={handleChange}>
                    <Tab value="signup" label="Sign Up" />
                    <Tab value="signin" label="Sign In" />
                </TabList>
                
                <TabPanel value="signup">
                    {/* signup tabs */}
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '32ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField 
                            id="name" label="Name" variant="outlined" 
                            onChange={(e) => handleFieldChange(e, 'username', e.target.value)}
                        />
                        <TextField 
                            id="email" label="Email" variant="outlined" 
                            onChange={(e) => handleFieldChange(e, 'email', e.target.value)}
                        />
                    </Box>
                    <StyledCardMargin>
                        <TextField 
                            id="password" 
                            label="Password" variant="outlined" fullWidth type="password"
                            helperText='Password must consists of 6 characters, including uppercase, lowercase, number and special symbols' 
                            onChange={(e) => handleFieldChange(e, 'password', e.target.value)}
                        />
                    </StyledCardMargin>
                    <StyledCardInfo>
                        <StyledCardMargin>
                            <TextField 
                                id="card" 
                                fullWidth 
                                label="Card" 
                                variant="filled"
                                onChange={(e) => handleFieldChange(e, 'cardNumber', e.target.value)}
                            />
                        </StyledCardMargin>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                                id="expiry" label="Expiry" variant="outlined" 
                                onChange={(e) => handleFieldChange(e, 'expiry', e.target.value)}
                            />
                            <TextField id="CVC" label="CVC" variant="outlined" 
                                onChange={(e) => handleFieldChange(e, 'cvc', e.target.value)}
                            />
                        </Box>
                        <StyledCardMargin>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Country
                            </InputLabel>
                            {/* change to dynamic later */}
                            <Select
                                defaultValue=''
                                fullWidth
                                onChange={(e) => handleFieldChange(e, 'country', e.target.value)}
                            >
                                <MenuItem value={'Australia'}>Australia</MenuItem>
                                <MenuItem value={'America'}>America</MenuItem>
                            </Select>
                        </StyledCardMargin>
                    </StyledCardInfo>
                     
                    <StyledSubmitBtn>
                        <Button 
                            type="submit"
                            variant="outlined"
                            onClick={handleSignupFormSubmit}
                        >
                            Submit
                        </Button>
                    </StyledSubmitBtn>
                    
                </TabPanel>
                <TabPanel value="signin" style={{minWidth:'400px',minHeight:'150px'}}>
                    <TextField 
                        id="email" label="Email" variant="outlined" fullWidth 
                        onChange={(e) => handleSigninFieldChange(e, 'email', e.target.value)}
                    />
                    <StyledPassword>
                        <TextField 
                            id="password" label="Password" variant="outlined" fullWidth type="password"
                            onChange={(e) => handleSigninFieldChange(e, 'password', e.target.value)} 
                        />
                    </StyledPassword>
                    <StyledSubmitBtn>
                        <Button 
                            type="submit" variant="outlined"
                            onClick={handleSigninFormSubmit}
                        >
                            Submit
                        </Button>
                    </StyledSubmitBtn>
                </TabPanel>
            </TabContext> 
      </Dialog>
    </React.Fragment>
  );
}
export default Modal;
