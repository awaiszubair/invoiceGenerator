import Header from '@/components/Header';
import { Zap, Shield, Sparkles, Clock, Globe, ArrowRight, CheckCircle, FileText, BrainCircuit } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About AI Billing Tool for Freelancers Free - InvoiceQuick',
  description: 'Deep dive into our AI invoice generator from description. Learn how to generate invoice using natural language for digital marketing services and more with our free invoice generator.',
  keywords: 'AI invoice maker free no signup, AI billing tool for freelancers free, invoice generator without login free, AI invoice generator from description, create invoice by typing description, generate invoice using natural language, invoice for digital marketing services, invoice generator with tax calculation free, invoice with amount in words automatically, Ai invoice generetor, invoice generator',
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1 className="font-outfit" style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              The Ultimate <span style={{ color: 'var(--primary)' }}>AI Invoice Maker Free No Signup</span> Required
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#475569', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Welcome to the future of billing. InvoiceQuick is the premier <strong>AI billing tool for freelancers free</strong> of cost. 
              Our <strong>invoice generator without login free</strong> access ensures you can get paid faster than ever before.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <a href="/" style={{ 
                backgroundColor: 'var(--primary)', 
                color: 'white', 
                padding: '1rem 2rem', 
                borderRadius: '12px', 
                fontWeight: 700, 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(67, 56, 202, 0.4)'
              }}>
                Try the AI Invoice Generator <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section style={{ padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 className="font-outfit" style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                Why Choice Our AI Invoice Maker?
              </h2>
              <p style={{ color: '#64748b' }}>Powerful features built into the best <strong>invoice generator</strong> on the web.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ padding: '2.5rem', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', transition: 'transform 0.3s ease' }}>
                <BrainCircuit size={40} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>AI Invoice Generator From Description</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Stop filling out forms manually. Our <strong>AI invoice generator from description</strong> reads your project details and builds the document for you instantly.
                </p>
              </div>
              
              <div style={{ padding: '2.5rem', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px' }}>
                <Zap size={40} style={{ color: '#059669', marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Natural Language Processing</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  You can <strong>generate invoice using natural language</strong>. Simply describe your work like you're talking to a friend, and watch the magic happen.
                </p>
              </div>
              
              <div style={{ padding: '2.5rem', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px' }}>
                <FileText size={40} style={{ color: '#ca8a04', marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Tax Calculation Built-In</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Our <strong>invoice generator with tax calculation free</strong> of charge handles all the math, including GST and VAT, so you never make an error.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section for SEO */}
        <section style={{ padding: '6rem 2rem', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="font-outfit" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '2rem' }}>
              Deep Dive: How to Create Invoice by Typing Description
            </h2>
            
            <div style={{ color: '#334155', fontSize: '1.1rem', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                In today's fast-paced digital economy, freelancers and agencies need tools that keep up. That's why we developed the most advanced <strong>Ai invoice generetor</strong> available. Unlike traditional software, our platform allows you to <strong>create invoice by typing description</strong>. Whether you need an <strong>invoice for digital marketing services</strong>, web development, or consulting, our AI understands your needs.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
                The Best AI Billing Tool for Freelancers Free
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                We believe that premium tools should be accessible to everyone. Our <strong>AI billing tool for freelancers free</strong> of any monthly subscriptions is designed to help you scale your business. With our <strong>AI invoice maker free no signup</strong>, you can create and download professional documents in under 30 seconds.
              </p>

              <div style={{ padding: '2rem', backgroundColor: '#ffffff', borderLeft: '4px solid var(--primary)', borderRadius: '0 12px 12px 0', margin: '2.5rem 0' }}>
                <p style={{ fontWeight: 600, fontStyle: 'italic', color: '#1e293b' }}>
                  "I was able to <strong>generate invoice using natural language</strong> for my latest client in 10 seconds. It's the best <strong>invoice generator without login free</strong> service I've ever found."
                </p>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>— Sarah J., Digital Marketer</p>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
                Automated Professional Features
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                A professional invoice needs more than just a list of items. It needs to be readable and compliant. Our tool provides an <strong>invoice with amount in words automatically</strong>, making your billing look corporate and professional. This <strong>Ai invoice generetor</strong> also ensures that your <strong>invoice generator with tax calculation free</strong> logic is applied to every single line item.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
                Perfect for Digital Agencies
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                If you are creating an <strong>invoice for digital marketing services</strong>, you often have complex tasks like "SEO optimization for 5 pages" or "Ad campaign management for June." Our <strong>AI invoice generator from description</strong> handles these strings with ease, breaking them down into clear, billable items.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>
                Why Use an Invoice Generator Without Login?
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Privacy is paramount. Using an <strong>invoice generator without login free</strong> means your client data never sits on a server where it could be breached. We don't track your clients, and we don't store your financial data. It's the safest way to <strong>create invoice by typing description</strong>.
              </p>

              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <p style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Ready to try the #1 AI invoice maker?</p>
                <a href="/" style={{ 
                  backgroundColor: '#0f172a', 
                  color: 'white', 
                  padding: '0.85rem 2.5rem', 
                  borderRadius: '10px', 
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-block'
                }}>
                  Go to Invoice Generator
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits List */}
        <section style={{ padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="font-outfit" style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '4rem' }}>
              How Our AI Invoice Maker Stands Out
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Amount in Words</h4>
                  <p style={{ fontSize: '0.95rem', color: '#64748b' }}>Our <strong>invoice with amount in words automatically</strong> feature ensures your totals are perfectly described.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Tax Accuracy</h4>
                  <p style={{ fontSize: '0.95rem', color: '#64748b' }}>Use the <strong>invoice generator with tax calculation free</strong> to stay compliant with local tax laws.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Marketing Friendly</h4>
                  <h4 style={{ fontSize: '0.9rem', color: '#64748b' }}>Build the perfect <strong>invoice for digital marketing services</strong> in seconds.</h4>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Natural Descriptions</h4>
                  <p style={{ fontSize: '0.95rem', color: '#64748b' }}>Simply <strong>create invoice by typing description</strong> and let the AI do the formatting.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Article Section */}
        <section style={{ padding: '4rem 2rem', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h4 className="font-outfit" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Summary: Your 2024 Invoicing Solution</h4>
            <p style={{ color: '#475569', lineHeight: 1.7 }}>
              If you've been looking for an <strong>AI invoice maker free no signup</strong> or a robust <strong>AI billing tool for freelancers free</strong>, you've found it. InvoiceQuick combines the power of an <strong>Ai invoice generetor</strong> with the simplicity of a standard <strong>invoice generator</strong>. Don't settle for less; <strong>generate invoice using natural language</strong> today and see why we are the top-rated <strong>invoice generator without login free</strong> platform.
            </p>
          </div>
        </section>
      </main>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          &copy; 2024 InvoiceQuick. The #1 AI Invoice Generator.
        </p>
      </footer>
    </div>
  );
}
