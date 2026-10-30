/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { OrderModalProvider } from './context/OrderModalContext';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import OrderOnlinePage from './pages/OrderOnlinePage';
import OrderFromUsPage from './pages/OrderFromUsPage';
import BookTablePage from './pages/BookTablePage';
import BanquetHallPage from './pages/BanquetHallPage';
import CateringPage from './pages/CateringPage';
import FranchisePage from './pages/FranchisePage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import PhotoCreditsPage from './pages/PhotoCreditsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <OrderModalProvider>
        <Routes>
          {/* Full-screen embedded ordering -- outside the site chrome */}
          <Route path="orderfromus" element={<OrderFromUsPage />} />
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
    </BrowserRouter>
  );
}
