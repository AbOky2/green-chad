'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted transition-colors focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:opacity-60'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    setStatus('sending')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) {
        setStatus('error')
        setError(json.error || 'Une erreur est survenue. Veuillez réessayer.')
        return
      }
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Connexion impossible. Vérifiez votre réseau puis réessayez.')
    }
  }

  const sending = status === 'sending'

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate={false}>
      {status === 'success' && (
        <p role="status" className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
          Message envoyé ! Nous vous répondrons dans les plus brefs délais.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Nom complet</label>
          <input id="name" name="name" type="text" required maxLength={120} autoComplete="name" placeholder="Votre nom" className={inputClass} disabled={sending} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="votre@email.com" className={inputClass} disabled={sending} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">Sujet</label>
        <input id="subject" name="subject" type="text" required maxLength={150} placeholder="Comment pouvons-nous aider ?" className={inputClass} disabled={sending} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={5} required maxLength={4000} placeholder="Votre message..." className={`${inputClass} resize-y`} disabled={sending} />
      </div>

      {/* Champ piège anti-spam : invisible pour les humains, rempli par les robots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Site web</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={sending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Envoyer le message
          </>
        )}
      </button>
    </form>
  )
}
