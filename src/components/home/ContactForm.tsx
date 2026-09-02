'use client'

import { useState } from 'react'

import { ArrowRight, Spinner } from '@/components/ui/Icons'

type Status = 'idle' | 'sending' | 'success' | 'error'

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
    <form className="space-y-6" onSubmit={handleSubmit}>
      {status === 'success' && (
        <p role="status" className="border-l-2 border-moss pl-4 text-sm text-ink">
          Message envoyé. Nous vous répondrons dans les plus brefs délais.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="border-l-2 border-terre pl-4 text-sm text-ink">
          {error}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="t-label mb-2 block text-stone">Nom complet</label>
          <input id="name" name="name" type="text" required maxLength={120} autoComplete="name" className="field" disabled={sending} />
        </div>
        <div>
          <label htmlFor="email" className="t-label mb-2 block text-stone">Email</label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className="field" disabled={sending} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="t-label mb-2 block text-stone">Sujet</label>
        <input id="subject" name="subject" type="text" required maxLength={150} className="field" disabled={sending} />
      </div>

      <div>
        <label htmlFor="message" className="t-label mb-2 block text-stone">Message</label>
        <textarea id="message" name="message" rows={6} required maxLength={4000} className="field resize-y" disabled={sending} />
      </div>

      {/* Champ piège anti-spam : invisible pour les humains, rempli par les robots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Site web</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={sending} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
        {sending ? 'Envoi en cours…' : 'Envoyer le message'}
        {sending ? <Spinner /> : <ArrowRight />}
      </button>
    </form>
  )
}
