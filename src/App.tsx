/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { OrderModalProvider } from './context/OrderModalContext';
import HomePage from './pages/HomePage';

// The homepage ships in the main bundle (it's where most visits land); every other
// page is its own chunk, fetched on first navigation. Suspense lives in PageTransition
// so the navbar/footer stay put while a page chunk loads.
const MenuPage = lazy(() => import('./pages/MenuPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const OrderOnlinePage = lazy(() => import('./pages/OrderOnlinePage'));
const OrderFromUsPage = lazy(() => import('./pages/OrderFromUsPage'));
const BookTablePage = lazy(() => import('./pages/BookTablePage'));
const BanquetHallPage = lazy(() => import('./pages/BanquetHallPage'));
const CateringPage = lazy(() => import('./pages/CateringPage'));
const FranchisePage = lazy(() => import('./pages/FranchisePage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PhotoCreditsPage = lazy(() => import('./pages/PhotoCreditsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/** The route tree, shared by the browser (BrowserRouter) and the prerenderer (StaticRouter, src/entry-server.tsx). */
export function AppRoutes() {
  return (
    <OrderModalProvider>
      <Routes>
        {/* Full-screen embedded ordering -- outside the site chrome */}
        <Route
          path="orderfromus"
          element={
            <Suspense fallback={<div className="h-dvh bg-white" />}>
              <OrderFromUsPage />
            </Suspense>
          }
        />
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="order-online" element={<OrderOnlinePage />} />
          <Route path="book-a-table" element={<BookTablePage />} />
          <Route path="banquet-hall" element={<BanquetHallPage />} />
          <Route path="catering" element={<CateringPage />} />
          <Route path="franchise" element={<FranchisePage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="photo-credits" element={<PhotoCreditsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </OrderModalProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
