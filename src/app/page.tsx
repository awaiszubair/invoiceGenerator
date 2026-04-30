import { Metadata } from 'next';
import HomeMain from '@/components/HomeMain';

export const metadata: Metadata = {
  title: 'AI Invoice Maker Free No Signup - InvoiceQuick',
  description: 'The best AI billing tool for freelancers free of cost. Generate invoices without login free. Create invoice by typing description using our advanced Ai invoice generetor.',
  keywords: 'AI invoice maker free no signup, AI billing tool for freelancers free, invoice generator without login free, AI invoice generator from description, create invoice by typing description, generate invoice using natural language, invoice for digital marketing services, invoice generator with tax calculation free, invoice with amount in words automatically, Ai invoice generetor, invoice generator',
  verification: {
    google: 'QhEO2Epscuxe7UxXfgJOCNs7ypeT5P6ff9SSZu96-aA',
  },
  openGraph: {
    title: 'InvoiceQuick - Free AI Invoice Generator',
    description: 'Create professional invoices instantly using natural language AI. No signup required.',
    type: 'website',
    url: 'https://invoicequick.com',
  }
};

export default function Home() {
  return <HomeMain />;
}
