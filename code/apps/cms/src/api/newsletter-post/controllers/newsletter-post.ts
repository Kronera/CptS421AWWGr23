/**
 * newsletter-post controller
 */

import { factories } from '@strapi/strapi';

function escHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailHtml(opts: {
  title: string;
  excerpt: string;
  articleUrl: string;
  unsubscribeUrl: string;
  siteUrl: string;
}): string {
  const { title, excerpt, articleUrl, unsubscribeUrl, siteUrl } = opts;
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${escHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f9">
    <tr><td align="center" style="padding:32px 16px">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08)">
        <tr><td style="background:linear-gradient(135deg,#0a3680 0%,#0d4ea6 60%,#f79520 100%);padding:32px 40px;text-align:center">
          <p style="margin:0;color:#fff;font-size:20px;font-weight:800">A Woman's Worth</p>
          <p style="margin:4px 0 0;color:rgba(255,255,255,.75);font-size:13px;letter-spacing:1px;text-transform:uppercase">Newsletter</p>
        </td></tr>
        <tr><td style="padding:40px 40px 32px">
          <h1 style="margin:0 0 16px;font-size:26px;font-weight:800;color:#004080;line-height:1.3">${escHtml(title)}</h1>
          <p style="margin:0 0 28px;font-size:15px;color:#444;line-height:1.7">${escHtml(excerpt)}</p>
          <table cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:10px;background:#f7941d">
            <a href="${articleUrl}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#fff;text-decoration:none;border-radius:10px">Read Full Article →</a>
          </td></tr></table>
        </td></tr>
        <tr><td style="padding:0 40px"><hr style="border:none;border-top:1px solid #eee;margin:0"></td></tr>
        <tr><td style="padding:24px 40px;text-align:center">
          <p style="margin:0;font-size:12px;color:#999">
            You're receiving this because you subscribed at <a href="${siteUrl}" style="color:#0a3680">${siteUrl}</a>.<br>
            <a href="${unsubscribeUrl}" style="color:#999">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export default factories.createCoreController('api::newsletter-post.newsletter-post' as any, ({ strapi }) => ({
  async send(ctx) {
    const { id } = ctx.params;

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const FROM_EMAIL = process.env.NEWSLETTER_FROM_EMAIL || 'AWW Newsletter <newsletter@awomansworth.co>';
    const SITE_URL = process.env.SITE_URL || 'https://awomansworth.co';

    if (!RESEND_API_KEY) {
      return ctx.badRequest('RESEND_API_KEY is not configured on the server.');
    }

    // 1. Fetch the newsletter post
    const post = await (strapi as any).documents('api::newsletter-post.newsletter-post').findOne({
      documentId: id,
    });

    if (!post) return ctx.notFound('Newsletter post not found.');

    if (post.emailStatus === 'Sent') {
      return ctx.badRequest('This newsletter has already been sent.');
    }
    if (post.emailStatus !== 'Ready to Send') {
      return ctx.badRequest(
        `Set emailStatus to "Ready to Send" first (currently: "${post.emailStatus || 'Draft'}").`
      );
    }

    // 2. Get active subscribers
    const subscribers = await (strapi as any)
      .documents('api::newsletter-subscriber.newsletter-subscriber')
      .findMany({ filters: { active: true } });

    if (!subscribers?.length) {
      return ctx.send({ success: true, message: 'No active subscribers to send to.', sent: 0, failed: 0 });
    }

    const subject = post.emailSubject || post.title;
    const articleUrl = `${SITE_URL}/newsletter/${post.slug}`;

    let sent = 0;
    let failed = 0;

    // 3. Send emails via Resend
    for (const sub of subscribers) {
      if (!sub.email) { failed++; continue; }

      const unsubscribeUrl = sub.unsubscribeToken
        ? `${SITE_URL}/newsletter/unsubscribe?token=${encodeURIComponent(sub.unsubscribeToken)}`
        : `${SITE_URL}/newsletter/unsubscribe`;

      const html = buildEmailHtml({
        title: post.title,
        excerpt: post.excerpt || '',
        articleUrl,
        unsubscribeUrl,
        siteUrl: SITE_URL,
      });

      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({ from: FROM_EMAIL, to: sub.email, subject, html }),
        });
        res.ok ? sent++ : failed++;
      } catch {
        failed++;
      }
    }

    // 4. Update post status
    await (strapi as any).documents('api::newsletter-post.newsletter-post').update({
      documentId: id,
      data: {
        emailStatus: failed === 0 ? 'Sent' : 'Failed',
        sentAt: new Date(),
      },
    });

    return ctx.send({
      success: true,
      message: `Sent to ${sent} subscriber${sent !== 1 ? 's' : ''}${failed > 0 ? ` (${failed} failed)` : ''}.`,
      sent,
      failed,
    });
  },
}));
