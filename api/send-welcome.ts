import { Resend } from 'resend';

// Vercel Serverless Function (Node.js)
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and Name are required' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Right Signal <welcome@rightsignal.social>',
      to: [email],
      subject: `Welcome to the Right Signal Community, ${name}!`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: black; font-size: 24px; font-weight: 800; border-bottom: 2px solid #EEE; padding-bottom: 10px;">WELCOME TO THE CIRCLE.</h1>
          <p style="margin-top: 20px;">Hi <strong>${name}</strong>,</p>
          <p>We're thrilled to have you here. You've just joined one of the fastest-growing communities for innovators and builders.</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">Quick Checklist:</p>
            <ul style="margin-top: 10px; padding-left: 20px;">
              <li>Get the app: <a href="https://rightsignal.social/#ios" style="color: #000; font-weight: 600;">iOS</a> or <a href="https://rightsignal.social/#android" style="color: #000; font-weight: 600;">Android</a>.</li>
              <li>Check out the <a href="https://rightsignal.social/startup-sandbox" style="color: #000; font-weight: 600;">Startup Sandbox</a>.</li>
              <li>Keep an eye on upcoming community events.</li>
            </ul>
          </div>
          <p>We're looking forward to seeing what you'll build next.</p>
          <p style="margin-top: 30px; font-size: 14px; font-weight: bold;">Welcome home,</p>
          <p style="font-size: 14px; color: #666; margin-top: -10px;">- The Right Signal Team</p>
        </div>
      `,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ message: 'Welcome email sent!', data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
