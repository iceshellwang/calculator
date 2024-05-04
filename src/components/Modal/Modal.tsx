
import * as React from 'react';
import { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Box from '@mui/material/Box';


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
interface ModalProps {
    open: boolean
    handleModalClose: () => void
  }
export const Modal: FunctionComponent<ModalProps> = ({
    open,
    handleModalClose,
})=>{
    const [value, setValue] = React.useState('signup');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleModalClose}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     console.log(formData);
        //     const formJson = Object.fromEntries((formData as any).entries());
        //     const email = formJson.email;
        //     handleModalClose();
        //   },
        // }}
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
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                    <TextField id="name" label="Name" variant="outlined" />
                    <TextField id="email" label="Email" variant="outlined" />
                    </Box>
                    <StyledCardInfo>
                        <StyledCardMargin>
                            <TextField 
                                id="card" 
                                fullWidth 
                                label="Card" 
                                variant="filled"
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
                            <TextField id="expiry" label="Expiry" variant="outlined" />
                            <TextField id="CVC" label="CVC" variant="outlined" />
                        </Box>
                        <StyledCardMargin>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Country
                            </InputLabel>
                            {/* change to dynamic later */}
                            <NativeSelect
                                defaultValue={'Australia'}
                                inputProps={{
                                name: 'country',
                                id: 'country',
                                }}
                                fullWidth
                            >
                                <option value={'Australia'}>Australia</option>
                            </NativeSelect>
                        </StyledCardMargin>
                    </StyledCardInfo>
                    {/* <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    /> */}
                     
                        <StyledSubmitBtn>
                            <Button type="submit" variant="outlined">
                                Submit
                            </Button>
                        </StyledSubmitBtn>
                    
                </TabPanel>
                <TabPanel value="signin">
                    {/* signin tabs */}
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="email" label="Email" variant="outlined" fullWidth />
                        <TextField id="password" label="Password" variant="outlined" fullWidth type="password" />
                        <StyledSubmitBtn>
                            <Button type="submit" variant="outlined">
                                Submit
                            </Button>
                        </StyledSubmitBtn>
                    </Box>
                </TabPanel>
            </TabContext> 
        
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default Modal;
