import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECEIVER_EMAIL = 'greenchad2010@gmail.com';
const GENERIC_ERROR = 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.';

export async function POST(request: NextRequest) {
  try {
    // Vérifier et normaliser les variables d'environnement
    const rawUser = process.env.EMAIL_USER ?? '';
    const rawPass = process.env.EMAIL_APP_PASSWORD ?? '';
    const emailUser = rawUser.trim();
    const emailAppPassword = rawPass.replaceAll(/\s/g, ''); // Gmail: 16 caractères sans espaces
    if (!emailUser || !emailAppPassword) {
      console.error('[Contact API] Variables manquantes: EMAIL_USER=', !!rawUser, 'EMAIL_APP_PASSWORD=', !!rawPass);
      return NextResponse.json(
        { error: GENERIC_ERROR },
        { status: 500 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { error: 'Requête invalide' },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body as { name?: string; email?: string; subject?: string; message?: string };

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailAppPassword,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: RECEIVER_EMAIL,
      replyTo: email, // Permet de répondre directement à l'utilisateur
      subject: `[Formulaire Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
            Nouveau message depuis le formulaire de contact
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Sujet:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #16a34a; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
            <p style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            <p>Ce message a été envoyé depuis le formulaire de contact du site GreenTchad.</p>
          </div>
        </div>
      `,
      text: `
Nouveau message depuis le formulaire de contact

Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message envoyé avec succès!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API] Erreur envoi email:', error);
    return NextResponse.json(
      { error: GENERIC_ERROR },
      { status: 500 }
    );
  }
}
