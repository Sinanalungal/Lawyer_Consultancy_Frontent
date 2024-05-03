import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";
import toast from "react-hot-toast";

interface UserData {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
}

interface OtpData {
  otp: string;
  email:string;
}

interface ResendData {
  phone_number: string;
  email:string;
}

interface UserState {
  loading: boolean;
  registered: boolean;
  error: { message: string } | null;
  user: UserData | null;
  timer:any;
}

const getUserDataFromLocalStorage = (): UserData | null => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    try {
      return JSON.parse(userDataString) as UserData;
    } catch (error) {
      return null;
    }
  }
  return null;
};

const initialState: UserState = {
  loading: false,
  registered: false,
  error: null,
  user: getUserDataFromLocalStorage(),
  timer: 0,
};

export const registerUserAsync = createAsyncThunk(
  'user/registerUser',
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}api/register/`, userData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }); 

      localStorage.setItem('userData', JSON.stringify(response.data.data)); 
      if (response.status === 200){
        if (userData.role != 'user'){
          toast.success('Successfully Registered!')
        }else{
          toast.success('Proceed to otp verification')
          toast.custom('otp send into your phone number')
        }
          
        
      }
      console.log(response.data.data)
      return response.data; 
    } catch (error) {
      return rejectWithValue({ message: 'Registration failed' });
    }
  }
);

export const OtpVerification = createAsyncThunk(
  'user/OtpVerification', 
  async (OtpData: OtpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}api/otpvalidation/`, OtpData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }); 

      if (response.status === 200) {
        toast.success('Successfully Registered!')
        localStorage.removeItem('userData');
      }
      console.log(response.data)
      return response.data; 
    } catch (error) {
      toast.error('OTP Timout , Please Resend OTP')
      return rejectWithValue({ message: 'Registration failed' });
    }
  }
);

export const ResendOtp =createAsyncThunk(
  'user/ResendOtp', 
  async ( ResendData: ResendData, { rejectWithValue})=>{
    try{
      const response = await axios.post(`${BASE_URL}api/resendotp/`, ResendData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200){
        toast.success('Otp sent successfully')
      }
      console.log(response.data)
      return response.data; 
    }catch{
      toast.error('timeout error please register once again');
    }
  }
)


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = true;
        state.error = null;
        state.timer = action.payload.timer;
        state.user = action.payload.data; 
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.registered = false;
        state.error = action.payload as { message: string } | null;
        // state.success = false;
        state.user = null;
      })
      .addCase(OtpVerification.pending, (state) => {
        state.loading = true;
      })
      .addCase(OtpVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = false;
        state.error = null;
        // state.success = false;
        state.user = null;
      })  
      .addCase(OtpVerification.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(ResendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(ResendOtp.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.timer = action.payload.timer;
      })  
      .addCase(ResendOtp.rejected, (state, action) => {
        state.loading = false;
        state.registered = false;
        state.error = null;
        state.user = null;
      }); 
      
  },
});

export default userSlice.reducer;
export type { UserData, UserState };
