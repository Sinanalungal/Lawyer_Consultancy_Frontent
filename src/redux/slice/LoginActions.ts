import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import {  toast } from 'react-toastify';

// import { RootState } from '../store';
// import { loginUserAPI } from '../../api/auth'; // Example API function

interface LoginState {
  loader: boolean;
  isAuthenticated: boolean;
  error: string | null;
  user: Record<string, any> | null;
  role:string | null;
  dataRequired: boolean;
}

const initialState: LoginState = {
  loader: false,
  isAuthenticated: false,
  error: null,
  user: null,
  role:null,
  dataRequired: false
};

export const GoogleLoginAsync = createAsyncThunk(
  'login/GoogleLoginAsync',
  async (code:string, { rejectWithValue }) => {
    try {
      // Assuming BASE_URL is defined elsewhere in your code
      const response = await axios.post(`${BASE_URL}api/login-with-google/`, {code:code}); 
      console.log(response.data,'this is the data')
      // toast.success('Login successful')
      // const token = { access } =response.data;
      var token = response.data.access_token
      const {access}=token;
      console.log(access,'this is the access token')
      const decodedToken = JSON.parse(atob(access.split('.')[1]));
      const { full_name, phone_number, email, role, is_verified } = decodedToken;
      console.log(full_name,phone_number,email,role,is_verified,'this is the decoded token')

      

      return {'data':response.data.access_token,'role':role,'registering':response.data.registering};

    } catch (error) {
      console.log(error);
      toast.error('Login failed')
      return rejectWithValue({ message: 'Login failed' }); 
    }
  }
);

export const loginAsync = createAsyncThunk(
    'login/loginAsync',
    async (loginData: { username: string, password: string }, { rejectWithValue }) => {
      try {
        // Assuming BASE_URL is defined elsewhere in your code
        const response = await axios.post(`${BASE_URL}token/userdata/`, loginData); 
        console.log(response.data)
        toast.success('Login successful')
        // const token = { access } =response.data;
       var token = response.data.access

       const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const { full_name, phone_number, email, role, is_verified,registering } = decodedToken;
        
        if (response.data.registering){
          toast.success('Login successful')
        }

        return {'data':response.data,'role':role,'registering':registering};

      } catch (error) {
        console.log(error);
        toast.error('Login failed')
        return rejectWithValue({ message: 'Login failed' }); 
      }
    }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStart(state) {
        state.loader = true;
        state.isAuthenticated = false;
        state.error = null;
        state.user = null;
        
      },
      loginSuccess(state, action: PayloadAction<Record<string, any>>) {
        state.loader = false;
        state.isAuthenticated = true;
        state.error = null;
        state.user = action.payload;
      },
      loginFailure(state, action: PayloadAction<string>) {
        state.loader = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.user = null;
      },
      logout(state) {
        state.loader = false;
        state.isAuthenticated = false;
        state.error = null;
        state.user = null;
        state.role = null;
      },
      modaloff(state) {
        state.dataRequired = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loader = true;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<Record<string, any>>) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.error = null;
        state.user = action.payload.data;
        state.role = action.payload.role;
        state.dataRequired = action.payload.registering;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loader = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        state.user = null;
        state.role= null;
      })
      .addCase(GoogleLoginAsync.pending, (state) => {
        state.loader = true;
      })
      .addCase(GoogleLoginAsync.fulfilled, (state, action: PayloadAction<Record<string, any>>) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.error = null;
        state.user = action.payload.data;
        state.role = action.payload.role;
        state.dataRequired = action.payload.registering;
      })
      .addCase(GoogleLoginAsync.rejected, (state, action) => {
        state.loader = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        state.user = null;
        state.role= null;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout ,modaloff } = loginSlice.actions;
export default loginSlice.reducer;
