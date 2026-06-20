import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import GobBar from '../components/GobBar';
import SiteHeader from '../components/SiteHeader';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper)]">
      <Toaster position="top-right" richColors closeButton />
      <GobBar />
      <SiteHeader />
      <MainNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
