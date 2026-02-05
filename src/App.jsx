import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { Header, Footer } from './components';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const RevenueAutomation = lazy(() => import('./sections/RevenueAutomation/RevenueAutomation'));

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
