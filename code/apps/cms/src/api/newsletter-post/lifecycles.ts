import { Resend } from "resend";

function blocksToHtml(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      const inline = (children: any[]) =>
        (children || [])
          .map((c: any) => {
            let t = (c.text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if (c.bold) t = `<strong>${t}</strong>`;
            if (c.italic) t = `<em>${t}</em>`;
            if (c.underline) t = `<u>${t}</u>`;
            if (c.code) t = `<code>${t}</code>`;
            if (c.type === "link") t = `<a href="${c.url}">${t}</a>`;
            return t;
          })
          .join("");

      switch (block.type) {
        case "heading":
          return `<h${block.level} style="color:#0a3680;">${inline(block.children)}</h${block.level}>`;
        case "paragraph":
          return `<p style="margin:0 0 12px;">${inline(block.children)}</p>`;
        case "list": {
          const tag = block.format === "ordered" ? "ol" : "ul";
          const items = (block.children || [])
            .map((item: any) => `<li>${inline(item.children)}</li>`)
            .join("");
          return `<${tag} style="margin:0 0 12px;padding-left:20px;">${items}</${tag}>`;
        }
        case "quote":
          return `<blockquote style="border-left:4px solid #0a3680;margin:0 0 12px;padding-left:16px;color:#555;">${inline(block.children)}</blockquote>`;
        case "code":
          return `<pre style="background:#f3f4f6;padding:12px;border-radius:4px;overflow-x:auto;"><code>${inline(block.children)}</code></pre>`;
        default:
          return inline(block.children) ? `<p>${inline(block.children)}</p>` : "";
      }
    })
    .join("\n");
}

export default {
  async afterUpdate(event: any) {
    const { result, params } = event;

    // Only fire when the publish action sets publishedAt
    if (!params?.data?.publishedAt || !result?.publishedAt) return;

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.NEWSLETTER_FROM_EMAIL ||
      "AWW Newsletter <newsletter@awomansworth.co>";
    const siteUrl = process.env.SITE_URL || "https://awomansworth.co";

    if (!apiKey) {
      console.warn("[Newsletter] RESEND_API_KEY not set — skipping email send");
      return;
    }

    const resend = new Resend(apiKey);

    // Fetch all active subscribers
    const subscriberService = strapi.service(
      "api::newsletter-subscriber.newsletter-subscriber"
    ) as any;

    const { results: subscribers } = await subscriberService.find({
      filters: { active: true },
      pagination: { pageSize: 1000 },
    });

    if (!subscribers || subscribers.length === 0) {
      console.log("[Newsletter] No active subscribers, skipping");
      return;
    }

    const post = result;
    const postUrl = `${siteUrl}/newsletter/${post.slug}`;
    const bodyHtml = Array.isArray(post.body) ? blocksToHtml(post.body) : "";

    console.log(
      `[Newsletter] Sending "${post.title}" to ${subscribers.length} subscribers`
    );

    for (const sub of subscribers) {
      const unsubUrl = `${siteUrl}/api/unsubscribe?token=${sub.unsubscribeToken}`;

      const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${post.title}</title></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <div style="background:#0a3680;padding:24px 32px;">
      <p style="margin:0;color:#f7941d;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-family:sans-serif;">A Woman's Worth Community</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:26px;font-family:Georgia,serif;">${post.title}</h1>
    </div>

    ${
      post.excerpt
        ? `<div style="background:#f0f4ff;padding:20px 32px;border-left:4px solid #f7941d;">
        <p style="margin:0;font-size:16px;color:#374151;font-style:italic;">${post.excerpt}</p>
      </div>`
        : ""
    }

    <div style="padding:32px;font-size:15px;line-height:1.75;color:#1a1a1a;">
      ${bodyHtml}
    </div>

    <div style="padding:0 32px 32px;text-align:center;">
      <a href="${postUrl}" style="display:inline-block;background:#0a3680;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-family:sans-serif;font-size:15px;">Read Online →</a>
    </div>

    <div style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="margin:0 0 8px;font-size:12px;color:#9ca3af;font-family:sans-serif;">
        A Woman's Worth Community &bull; Spokane, WA
      </p>
      <p style="margin:0;font-size:12px;font-family:sans-serif;">
        <a href="${unsubUrl}" style="color:#9ca3af;">Unsubscribe</a>
      </p>
    </div>

  </div>
</body>
</html>`;

      try {
        await resend.emails.send({
          from: fromEmail,
          to: sub.email,
          subject: post.title,
          html,
        });
      } catch (err) {
        console.error(`[Newsletter] Failed to send to ${sub.email}:`, err);
      }
    }

    console.log(`[Newsletter] Done — "${post.title}" sent to ${subscribers.length} subscribers`);
  },
};
