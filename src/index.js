import React from 'react';
import ReactDOM from 'react-dom/client';
// import { setupStore } from './store/store';
import store from './store/store';
import { Provider } from 'react-redux';

import App from './App';
import './assets/fonts/style.css';
import './styles/index.scss';

// const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('app-root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);