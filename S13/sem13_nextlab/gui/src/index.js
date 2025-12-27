import React from 'react';
import ReactDOM from 'react-dom/client'; // Important: /client
import App from './components/App';
import { Provider } from 'react-redux';
import store from './stores/store';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);