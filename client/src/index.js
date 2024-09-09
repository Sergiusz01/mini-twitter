import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/ReduxStore.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';  // Importuj MantineProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MantineProvider>  {/* Otwieramy MantineProvider */}
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<App />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </MantineProvider>  {/* Zamykamy MantineProvider */}
    </React.StrictMode>
);

// Pomiar wydajności aplikacji
reportWebVitals();
