import connectDB from '@/lib/db';
import Post from '@/models/Post';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  await connectDB();
  const posts = await Post.find({ isPublished: true }).sort({ createdAt: -1 });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
      <Navbar />
      <div className="container" style={{ padding: '4rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3rem', textAlign: 'center' }}>
          Our <span style={{ color: 'var(--primary)' }}>Blog</span>
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {posts.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '4rem', color: 'var(--secondary)' }}>
              No blog posts available yet.
            </p>
          ) : (
            posts.map(post => (
              <Link href={`/blog/${post.slug}`} key={post._id.toString()}>
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '2rem', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--card-shadow)',
                  height: '100%',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{post.title}</h2>
                  <p style={{ color: 'var(--secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{post.excerpt || post.content.substring(0, 150) + '...'}</p>
                  <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>Read More →</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
