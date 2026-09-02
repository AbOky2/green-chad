import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const RECEIVER_EMAIL = 'greenchad2010@gmail.com'
const GENERIC_ERROR = "Erreur lors de l'envoi du message. Veuillez réessayer plus tard."
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const LIMITS = { name: 120, email: 200, subject: 150, message: 4000 } as const
type Field = keyof typeof LIMITS

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

const badRequest = (error: string) => NextResponse.json({ error }, { status: 400 })

export async function POST(request: NextRequest) {
  const emailUser = (process.env.EMAIL_USER ?? '').trim()
  const emailAppPassword = (process.env.EMAIL_APP_PASSWORD ?? '').replace(/\s/g, '') // Gmail : 16 caractères sans espaces
  if (!emailUser || !emailAppPassword) {
    console.error('[Contact API] Variables manquantes : EMAIL_USER ou EMAIL_APP_PASSWORD')
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return badRequest('Requête invalide.')
  }

  // Champ piège : un robot qui le remplit est ignoré silencieusement.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ message: 'Message envoyé avec succès !' })
  }

  const fields = {} as Record<Field, string>
  for (const field of Object.keys(LIMITS) as Field[]) {
    const value = typeof body[field] === 'string' ? (body[field] as string).trim() : ''
    if (!value) return badRequest('Tous les champs sont requis.')
    if (value.length > LIMITS[field]) return badRequest(`Le champ « ${field} » est trop long.`)
    fields[field] = value
  }
  if (!EMAIL_PATTERN.test(fields.email)) return badRequest('Adresse email invalide.')

  const safe = {
    name: escapeHtml(fields.name),
    email: escapeHtml(fields.email),
    subject: escapeHtml(fields.subject),
    message: escapeHtml(fields.message),
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailAppPassword },
    })

    await transporter.sendMail({
      from: emailUser,
      to: RECEIVER_EMAIL,
      replyTo: fields.email,
      subject: `[Formulaire Contact] ${fields.subject.replace(/[\r\n]+/g, ' ')}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #11201a;">
          <h2 style="color: #227c3a; border-bottom: 2px solid #227c3a; padding-bottom: 10px;">Nouveau message depuis le site</h2>
          <div style="background: #f7f8f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${safe.name}</p>
            <p><strong>Email :</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
            <p><strong>Sujet :</strong> ${safe.subject}</p>
          </div>
          <div style="padding: 20px; border-left: 4px solid #227c3a; margin: 20px 0;">
            <p style="line-height: 1.6; white-space: pre-wrap;">${safe.message}</p>
          </div>
          <p style="margin-top: 30px; color: #6b7f75; font-size: 12px;">Envoyé depuis le formulaire de contact du site Green-Chad.</p>
        </div>
      `,
      text: `Nouveau message depuis le site\n\nNom : ${fields.name}\nEmail : ${fields.email}\nSujet : ${fields.subject}\n\nMessage :\n${fields.message}\n`,
    })

    return NextResponse.json({ message: 'Message envoyé avec succès !' })
  } catch (error) {
    console.error('[Contact API] Erreur envoi email :', error)
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 })
  }
}
