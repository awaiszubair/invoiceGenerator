'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []);

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      setPosts(posts.filter(p => p._id !== id));
    } catch (error) {
      alert('Failed to delete post');
    }
  };

  if (isLoading) return <div>Loading posts...</div>;

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Blog Posts</h1>
        <Link href="/admin/posts/new" style={{ 
          backgroundColor: 'var(--primary)', 
          color: 'white', 
          padding: '0.6rem 1.25rem', 
          borderRadius: 'var(--radius)', 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Plus size={18} /> New Post
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--secondary)' }}>No posts yet.</p>
        ) : (
          posts.map(post => (
            <div key={post._id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '1rem', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius)' 
            }}>
              <div>
                <h3 style={{ fontWeight: 600 }}>{post.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>/{post.slug} • {post.isPublished ? 'Published' : 'Draft'}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link href={`/admin/posts/${post._id}`} style={{ padding: '0.5rem', color: 'var(--primary)' }}>
                  <Edit size={18} />
                </Link>
                <button onClick={() => deletePost(post._id)} style={{ padding: '0.5rem', color: '#ef4444' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
