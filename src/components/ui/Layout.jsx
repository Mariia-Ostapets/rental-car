import { Suspense } from 'react';
import AppBar from '../AppBar/AppBar';

export default function Layout({ children }) {
  return (
    <>
      <AppBar />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 120px' }}>
        <Suspense fallback={null}>{children}</Suspense>
      </div>
    </>
  );
}
