import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
};

export default function PageLayout({
  children,
  className = '',
  showFooter = false,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden">
      <Navbar />
      <main className={`flex-grow w-full ${className}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}