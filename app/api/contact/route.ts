import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Always log message on server terminal so nothing is ever lost
    console.log('\n========================================');
    console.log('📬 NEW CONTACT MESSAGE RECEIVED');
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject || 'General Inquiry'}`);
    console.log(`Message:\n${message}`);
    console.log('========================================\n');

    const mailSubject = `[Portfolio] ${subject || 'New Inquiry'} from ${name}`;
    const mailBody = `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'General Inquiry'}\n\nMessage:\n${message}`;

    // 1. Check for Web3Forms Access Key (https://web3forms.com)
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || '382e2260-5eea-4df8-bf07-7fda2533f892';
    if (web3formsKey) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name,
            email,
            subject: mailSubject,
            message: mailBody,
            from_name: `${name} (Portfolio)`,
          }),
        });
        const resData = await res.json();
        if (res.ok && resData.success) {
          return NextResponse.json({
            success: true,
            provider: 'web3forms',
            message: `Message sent directly to Aman's inbox! Thank you ${name}, I will reply to ${email} soon.`,
          });
        }
        console.error('Web3Forms returned failure:', resData);
      } catch (e) {
        console.error('Web3Forms dispatch error:', e);
      }
    }

    // 2. Check for Resend API Key (https://resend.com)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['amanpatelsrm@gmail.com'],
            reply_to: email,
            subject: mailSubject,
            text: mailBody,
          }),
        });
        if (res.ok) {
          return NextResponse.json({
            success: true,
            provider: 'resend',
            message: `Message sent directly to Aman's inbox! Thank you ${name}, I will reply to ${email} soon.`,
          });
        }
        const resData = await res.text();
        console.error('Resend dispatch error:', resData);
      } catch (e) {
        console.error('Resend dispatch error:', e);
      }
    }

    // 3. Check for custom Formspree endpoint (https://formspree.io)
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    if (formspreeEndpoint && !formspreeEndpoint.includes('mqkenwqp')) {
      try {
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            _replyto: email,
            subject: mailSubject,
            message: mailBody,
          }),
        });
        if (res.ok) {
          return NextResponse.json({
            success: true,
            provider: 'formspree',
            message: `Message sent directly to Aman's inbox! Thank you ${name}, I will reply to ${email} soon.`,
          });
        }
        console.error('Formspree returned status:', res.status);
      } catch (e) {
        console.error('Formspree dispatch error:', e);
      }
    }

    // If no external email service is configured or all attempts failed,
    // be completely transparent: the message is logged, but an API key is needed for direct inbox delivery.
    return NextResponse.json({
      success: false,
      needsSetup: true,
      error: 'Direct email delivery service not configured yet in .env.local.',
      mailtoUrl: `mailto:amanpatelsrm@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`,
      logged: true,
    }, { status: 200 });

  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Failed to process message. Please email directly at amanpatelsrm@gmail.com' },
      { status: 500 }
    );
  }
}
