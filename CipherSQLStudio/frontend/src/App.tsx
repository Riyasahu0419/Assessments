import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AssignmentListPage from './pages/AssignmentListPage';
import './styles/global.scss';

const AssignmentAttemptPage = lazy(() => import('./pages/AssignmentAttemptPage'));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1>CipherSQLStudio</h1>
            <p>Practice SQL with interactive assignments</p>
          </div>
        </header>

        <main className="app-main">
          <Suspense fallback={<div className="loading-spinner" />}>
            <Routes>
              <Route path="/" element={<AssignmentListPage />} />
              <Route path="/assignments/:id" element={<AssignmentAttemptPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
