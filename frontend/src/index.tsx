import './assets/css/App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AudioProvider } from 'contexts/AudioContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AudioProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AudioProvider>,
);
