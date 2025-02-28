import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from '../Header/Header';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const CarsPage = lazy(() => import('../../pages/CarsPage/CarsPage'));
const CarDetailsPage = lazy(() =>
  import('../../pages/CarDetailsPage/CarDetailsPage')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

export default function App() {
  return (
    <>
      <Header />
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CarsPage />} />
              <Route path="/catalog/:id" element={<CarDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
    </>
  );
}
