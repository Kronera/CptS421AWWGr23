import React, { useState } from 'react';
import type { StrapiApp } from '@strapi/strapi/admin';

const SendNewsletterButton = () => {
  const [clicked, setClicked] = useState(false);

  // Read documentId from the URL — safe, no hooks that could crash the admin
  // URL pattern: /admin/content-manager/collection-types/api::newsletter-post.newsletter-post/[documentId]
  const match = window.location.pathname.match(
    /\/content-manager\/collection-types\/api::newsletter-post\.newsletter-post\/([^/?]+)/
  );
  if (!match) return null;
  const documentId = match[1];
  if (!documentId || documentId === 'create') return null;

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
