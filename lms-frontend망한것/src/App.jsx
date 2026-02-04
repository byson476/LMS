import React, { Suspense, lazy, createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { refreshJWT  } from './util/jwtUtil.js';

// Lazy loaded pages
const Header = lazy(() => import('./layout/Header.jsx'));
const Navigation = lazy(() => import('./layout/Navigation.jsx'));
const Footer = lazy(() => import('./layout/Footer.jsx'));
const UserMainPage = lazy(() => import('./page/user/UserMainPage.jsx'));

export const ShopGlobalCommonContext = createContext(null);

const App = () => {
  const courses = [];

  // 토큰 자동 갱신
  useEffect(() => {
    autoRefreshToken();
    const interval = setInterval(() => autoRefreshToken(), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ShopGlobalCommonContext.Provider value={{ courses }}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<UserMainPage />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </Router>
    </ShopGlobalCommonContext.Provider>
  );
};

export default App;
