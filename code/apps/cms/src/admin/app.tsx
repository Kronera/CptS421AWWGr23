import React, { useState, useEffect } from 'react';
import type { StrapiApp } from '@strapi/strapi/admin';

const SendNewsletterButton = () => {
  const [clicked, setClicked] = useState(false);
  const [documentId, setDocumentId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const match = window.location.pathname.match(
        /\/content-manager\/collection-types\/api::newsletter-post\.newsletter-post\/([^/?]+)/
      );
      if (match && match[1] && match[1] !== 'create') {
        setDocumentId(match[1]);
      }
    } catch {}
  }, []);

  if (!documentId) return null;

  return (
    <div style={{ marginTop: '16px', padding: '12px', background: '#f0f4ff', borderRadius: '8px', border: '1px solid #c7d4f0' }}>
      <button
        onClick={() => setClicked(true)}
        style={{
          width: '100%',
          padding: '10px 16px',
          background: '#0a3680',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        📧 Send Newsletter as Email
      </button>
      {clicked && (
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#555' }}>
          Email sending coming soon! This button will be activated once the email service is configured.
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
