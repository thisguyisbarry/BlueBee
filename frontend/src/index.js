import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import Amplify from 'aws-amplify';
import config from './config';

// Amplify.configure({
//   Storage: {
//     region: config.s3.REGION,
//     bucket: config.s3.BUCKET,
//     identityPoolId: config.cognito.IDENTITY_POOL_ID
//   },
//   API: {
//     endpoints: [
//       {
//         name: "events",
//         endpoint: config.apiGateway.URL,
//         region: config.apiGateway.REGION
//       },
//     ]
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

