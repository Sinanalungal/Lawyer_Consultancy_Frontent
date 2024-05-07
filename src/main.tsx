import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import store,{persistor} from './redux/app/store.ts'
import ShowToast from './components/toastComponent/ShowToast.tsx';
// import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <ShowToast/>
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
  </Provider>
</React.StrictMode>,
)

