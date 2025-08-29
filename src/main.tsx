
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// 1. Import the Provider and the store
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
);