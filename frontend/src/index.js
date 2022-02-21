import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import Amplify from 'aws-amplify';
import config from './config';
import { BrowserRouter as Router } from 'react-router-dom';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "events",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

