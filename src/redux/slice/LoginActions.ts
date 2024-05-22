import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import {  toast } from 'react-toastify';


interface LoginState {
  loader: boolean;
  isAuthenticated: boolean;
  error: string | null;
  user: Record<string, any> | null;
  role:string | null;
  dataRequired: boolean;
  value:Number | null;
}

const initialState: LoginState = {
  loader: false,
  isAuthenticated: false,
  error: null,
  user: null,
  role:null,
  dataRequired: false,
  value:null
};

//============================================================
// interface IntecepterData{
//   baseUrl:string;
//   user:any;
// }

// export const InterceptorManage = createAsyncThunk(
//   'login/InterceptorManage',
//   async (Data:IntecepterData, { rejectWithValue }) => {
//     try {
//       const accessToken = Data.user.access;
//       console.log(accessToken)
//       if (!accessToken) {
//         throw new Error('Access token is missing');
//       }
//       console.log('token checking...')
//       const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
//       const expirationTimeOfAccessToken = decodedToken.exp * 1000; 
//       const accessTokenValid = Date.now() >= expirationTimeOfAccessToken;
//       if (accessTokenValid || Date.now() + 20000 >= expirationTimeOfAccessToken) {
//         const refreshToken = Data.user.refresh;
//         const response = await axios.post(`${Data.baseUrl}/token/refresh/`, { refresh: refreshToken });
        
//       }


//     } catch (error) {
//       console.log(error);
      
//     }
//   }
// );
//============================================================================

export const GoogleLoginAsync = createAsyncThunk(
  'login/GoogleLoginAsync',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}api/login-with-google/`, { code });
      var token = response.data.access_token
      console.log(token);
      

      // Store tokens in local storage as a JSON object
      const tokens = { access: token.access, refresh: token.refresh };
      localStorage.setItem('authTokens', JSON.stringify(tokens));
      console.log(tokens);
      

      const {access}=token;
      const decodedToken = JSON.parse(atob(access.split('.')[1]));
      const { id, role, registering } = decodedToken;

      // console.log({ data: access_token,'role':role,'registering':registering,'id':id });
      
      return { data: token,'role':role,'registering':registering,'id':id };

    } catch (error) {
      console.log(error); 
      toast.error('Something went wrong');
      return rejectWithValue({ message: 'Login failed' });
    }
  }
);
// export const GoogleLoginAsync = createAsyncThunk(
//   'login/GoogleLoginAsync',
//   async (code:string, { rejectWithValue }) => {
//     try {
//       console.log(code,'code here')
//       // Assuming BASE_URL is defined elsewhere in your code
//       const response = await axios.post(`${BASE_URL}api/login-with-google/`, {code:code}); 
//       console.log(response.data,'this is the data')
//       // toast.success('Login successful')
//       // const token = { access } =response.data;
//       var token = response.data.access_token
//       const {access}=token;
//       console.log(access,'this is the access token')
//       const decodedToken = JSON.parse(atob(access.split('.')[1]));
//       const {id, full_name, phone_number, email, role, is_verified } = decodedToken;
//       console.log(full_name,phone_number,email,role,is_verified,id,'this is the decoded token')

      

//       return {'data':response.data.access_token,'role':role,'registering':response.data.registering,'id':id};

//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.detail)
//       return rejectWithValue({ message: 'Login failed' }); 
//     }
//   }
// );


export const loginAsync = createAsyncThunk(
  'login/loginAsync',
  async (loginData: { username: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}token/userdata/`, loginData);
      // const { access, refresh } = response.data;
      // console.log(response);
      
      var token = response.data
      console.log(token.access);
      
      // Store tokens in local storage as a JSON object
      const tokens = { access: token.access, refresh: token.refresh };
      localStorage.setItem('authTokens', JSON.stringify(tokens));

      const {access} = token
      const decodedToken = JSON.parse(atob(access.split('.')[1]));
      const { id, role, registering } = decodedToken;
      console.log('worked')
      return { data: token, 'role':role,'registering':registering,'id':id};
    } catch (error) {
      console.log(error);
      
      toast.error('something went wrong');
      return rejectWithValue({ message: 'Login failed' });
    }
  }
);

// export const loginAsync = createAsyncThunk(
//     'login/loginAsync',
//     async (loginData: { username: string, password: string }, { rejectWithValue }) => {
//       try {
//         const response = await axios.post(`${BASE_URL}token/userdata/`, loginData); 
//         console.log(response.data)
//         toast.success('Login successful')
//         // const token = { access } =response.data;
//        var token = response.data.access

//        const decodedToken = JSON.parse(atob(token.split('.')[1]));
//         const { id ,full_name, phone_number, email, role, is_verified ,registering } = decodedToken;
//         console.log(id,'id')
//         if (response.data.registering){
//           toast.success('Login successful')
//         }

//         return {'data':response.data,'role':role,'registering':registering ,id:id};

//       } catch (error) {
//         console.log(error);
//         // toast.error(error.message)
//         toast.error(error.response.data.detail)
//         return rejectWithValue({ message: 'Login failed' }); 
//       }
//     }
// );


// ------------------------------------------------------



// ---------------------------------------------------------------------------------

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
      setAccess(state,value){
        state.user = value;
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
        state.value = null;
        localStorage.removeItem('authTokens');

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
        state.value =action.payload.id;
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
        state.value =action.payload.id;
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

export const { loginStart, loginSuccess, loginFailure, logout ,modaloff ,setAccess } = loginSlice.actions;
export default loginSlice.reducer;
