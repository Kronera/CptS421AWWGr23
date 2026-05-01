import React, { useState } from 'react';
import type { StrapiApp } from '@strapi/strapi/admin';

const SendNewsletterButton = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Parse documentId from URL: /admin/content-manager/collection-types/api::newsletter-post.newsletter-post/[documentId]
  const pathname = window.location.pathname;
  const match = pathname.match(/\/content-manager\/collection-types\/api::newsletter-post\.newsletter-post\/([^/?]+)/);
  if (!match) return null;
  const documentId = match[1];
  if (!documentId || documentId === 'create') return null;

  const handleSend = async () => {
    if (status === 'sending') return;
    if (!window.confirm('Send this newsletter to ALL active subscribers? This cannot be undone.')) return;

    setStatus('sending');
    setMessage('');

    try {
      const res = await fetch(`/api/newsletter-posts/${documentId}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Newsletter sent!');
      } else {
        setStatus('error');
        setMessage(data.error?.message || data.message || 'Failed to send.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const bgColor = status === 'success' ? '#f0faf0' : status === 'error' ? '#fff0f0' : '#f0f0ff';
  const btnColor = status === 'success' ? '#328048' : status === 'error' ? '#d02b20' : '#0a3680';
  const btnLabel =
    status === 'sending' ? 'Sending...' :
    status === 'success' ? '✓ Newsletter Sent!' :
    '📧 Send Newsletter to All Subscribers';

  return (
    <div style={{ marginTop: '16px', padding: '12px', background: bgColor, borderRadius: '8px', border: '1px solid #ddd' }}>
      <button
        onClick={handleSend}
        disabled={status === 'sending' || status === 'success'}
        style={{
          width: '100%',
          padding: '10px 16px',
          background: status === 'success' || status === 'error' ? btnColor : '#0a3680',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: status === 'sending' || status === 'success' ? 'not-allowed' : 'pointer',
          opacity: status === 'sending' ? 0.7 : 1,
        }}
      >
        {btnLabel}
      </button>
      {message && (
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: status === 'error' ? '#d02b20' : '#328048' }}>
          {message}
        </p>
      )}
      {status === 'idle' && (
        <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#888' }}>
          Set emailStatus to "Ready to Send" before clicking.
        </p>
      )}
    </div>
  );
};

export default {
  config: {},
  bootstrap(app: StrapiApp) {
    app.injectContentManagerComponent('editView', 'informations', {
      name: 'send-newsletter-button',
      Component: SendNewsletterButton,
    });
  },
};
