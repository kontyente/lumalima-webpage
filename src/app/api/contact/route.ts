import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Translation function for server-side
const translations: Record<string, Record<string, string>> = {
  en: {
    'email.confirmation.subject': 'Message Received - Lumalima',
    'email.confirmation.greeting': 'Dear',
    'email.confirmation.body1': 'Thank you for contacting Lumalima. We have received your message and will get back to you within 24-48 hours.',
    'email.confirmation.body2': 'Here is a copy of your message:',
    'email.confirmation.projectType': 'Project Type',
    'email.confirmation.message': 'Message',
    'email.confirmation.footer': 'Best regards,<br>The Lumalima Team',
    'email.confirmation.website': 'Visit our website',
    'category.housing': 'Housing',
    'category.comercial': 'Commercial',
    'category.public': 'Public',
    'category.urban': 'Urban',
  },
  pt: {
    'email.confirmation.subject': 'Mensagem Recebida - Lumalima',
    'email.confirmation.greeting': 'Caro',
    'email.confirmation.body1': 'Obrigado por contactar a Lumalima. Recebemos a sua mensagem e entraremos em contacto dentro de 24-48 horas.',
    'email.confirmation.body2': 'Aqui está uma cópia da sua mensagem:',
    'email.confirmation.projectType': 'Tipo de Projeto',
    'email.confirmation.message': 'Mensagem',
    'email.confirmation.footer': 'Melhores cumprimentos,<br>A Equipa Lumalima',
    'email.confirmation.website': 'Visite o nosso website',
    'category.housing': 'Habitação',
    'category.comercial': 'Comercial',
    'category.public': 'Público',
    'category.urban': 'Urbano',
  },
  de: {
    'email.confirmation.subject': 'Nachricht Erhalten - Lumalima',
    'email.confirmation.greeting': 'Liebe(r)',
    'email.confirmation.body1': 'Vielen Dank, dass Sie Lumalima kontaktiert haben. Wir haben Ihre Nachricht erhalten und werden uns innerhalb von 24-48 Stunden bei Ihnen melden.',
    'email.confirmation.body2': 'Hier ist eine Kopie Ihrer Nachricht:',
    'email.confirmation.projectType': 'Projekttyp',
    'email.confirmation.message': 'Nachricht',
    'email.confirmation.footer': 'Mit freundlichen Grüßen,<br>Das Lumalima Team',
    'email.confirmation.website': 'Besuchen Sie unsere Website',
    'category.housing': 'Wohnen',
    'category.comercial': 'Gewerbe',
    'category.public': 'Öffentlich',
    'category.urban': 'Urban',
  }
};

const t = (key: string, lang: string): string => {
  return translations[lang]?.[key] || translations.en[key] || key;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectType, message, recaptchaToken, language = 'en' } = body;

    // Validate required fields
    if (!name || !email || !message || !recaptchaToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    try {
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        }
      );

      const recaptchaData = await recaptchaResponse.json();
      console.log('reCAPTCHA v3 verification result:', recaptchaData);

      if (!recaptchaData.success) {
        console.error('reCAPTCHA failed:', recaptchaData['error-codes']);
        return NextResponse.json(
          { error: `reCAPTCHA verification failed: ${recaptchaData['error-codes']?.join(', ') || 'Unknown error'}` },
          { status: 400 }
        );
      }

      // For reCAPTCHA v3, check the score (0.0 to 1.0, higher is better)
      const score = recaptchaData.score;
      console.log('reCAPTCHA v3 score:', score);
      
      if (score < 0.5) {
        console.error('reCAPTCHA score too low:', score);
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed: suspicious activity detected' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return NextResponse.json(
        { error: 'reCAPTCHA service unavailable' },
        { status: 400 }
      );
    }

    // Get translated project type
    const translatedProjectType = projectType ? t(`category.${projectType}`, language) : t('email.confirmation.projectType', language);

    // Send notification email to admin
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: 'Contact Form <noreply@lumalima.com>',
      to: [process.env.CONTACT_EMAIL!],
      subject: `New Contact Form Submission - ${translatedProjectType || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${translatedProjectType || 'Not specified'}</p>
        <p><strong>Language:</strong> ${language.toUpperCase()}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from Lumalima contact form</small></p>
      `,
    });

    if (adminError) {
      console.error('Admin email error:', adminError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const { data: confirmData, error: confirmError } = await resend.emails.send({
      from: 'Lumalima <noreply@lumalima.com>',
      to: [email],
      subject: t('email.confirmation.subject', language),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1d1d1f;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-size: 32px; font-weight: 300; margin: 0; color: #1d1d1f;">Lumalima</h1>
            <p style="color: #86868b; margin: 5px 0 0 0;">Illumination Atelier</p>
          </div>
          
          <h2 style="color: #1d1d1f; font-weight: 500; margin-bottom: 20px;">${t('email.confirmation.greeting', language)} ${name},</h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">${t('email.confirmation.body1', language)}</p>
          
          <div style="background-color: #f5f5f7; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1d1d1f;">${t('email.confirmation.body2', language)}</h3>
            <p><strong>${t('email.confirmation.projectType', language)}:</strong> ${translatedProjectType || 'Not specified'}</p>
            <p><strong>${t('email.confirmation.message', language)}:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 8px; margin: 10px 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p style="line-height: 1.6; margin: 30px 0 20px 0;">${t('email.confirmation.footer', language)}</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #d2d2d7;">
            <a href="https://lumalima.com" style="color: #007aff; text-decoration: none;">${t('email.confirmation.website', language)}</a>
          </div>
        </div>
      `,
    });

    if (confirmError) {
      console.error('Confirmation email error:', confirmError);
      // Don't fail the request if confirmation email fails, just log it
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: adminData?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}