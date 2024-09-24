import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import "antd/dist/antd.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserProvider from './components/providers/UserProvider';
import PresaleProvider from './components/providers/PresaleProvider';
// eslint-disable-next-line
import WalletProvider from './components/providers/WalletProvider';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <PresaleProvider>
        <App />
      </PresaleProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
window.addEventListener('load', () => {
   if ("serviceWorker" in navigator) {
      // Register a service worker hosted at the root of the
      // site using the default scope.
      navigator.serviceWorker.register("%PUBLIC_URL%/sw.js",{scope:"/"}).then(
      (registration) => {
         console.log("Service worker registration succeeded:", registration);
      },
      (error) => {
         console.error(`Service worker registration failed: ${error}`);
      },
    );
  } else {
     console.error("Service workers are not supported.");
  }
      });
