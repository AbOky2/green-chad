import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Configuration du transporteur email
    // Utilisez les variables d'environnement pour la sécurité
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Votre adresse Gmail
        pass: process.env.EMAIL_APP_PASSWORD, // Mot de passe d'application Gmail
      },
    });

    // Email de réception des formulaires (onglet Contact)
    const receiverEmail = 'greenchad2010@gmail.com';

    // Configuration de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiverEmail,
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
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
}
