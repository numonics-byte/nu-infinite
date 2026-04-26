import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "Email service not configured" }, { status: 503 });
    }
    const resend = new Resend(apiKey);

    const { name, email, type, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: process.env.FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL ?? "contact@example.com",
      subject: `Booking Inquiry: ${type || "General"} — from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #09090E; color: #ffffff; padding: 32px; border-left: 4px solid #FF1480;">
          <h2 style="color: #FF1480; font-size: 24px; margin: 0 0 24px; text-transform: uppercase; letter-spacing: 0.05em;">
            New Booking Inquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #39FF14; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #ffffff;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #39FF14; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #FFD700;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #39FF14; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em;">Type</td>
              <td style="padding: 8px 0; color: #ffffff;">${type || "Not specified"}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; border-top: 2px dashed #FF1480; padding-top: 24px;">
            <p style="color: #39FF14; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em; margin: 0 0 8px;">Message</p>
            <p style="color: #ffffff; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
