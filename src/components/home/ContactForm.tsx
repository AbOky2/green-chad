'use client'

import { useState } from 'react'

import { ArrowRight, Spinner } from '@/components/ui/Icons'

type Status = 'idle' | 'sending' | 'success' | 'error'

const label = 'mb-2 block text-xs font-bold uppercase tracking-wider text-ivory/60'

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
    <form className="space-y-5" onSubmit={handleSubmit}>
      {status === 'success' && (
        <p role="status" className="rounded-2xl border border-leaf/40 bg-leaf/15 px-5 py-4 text-sm font-semibold text-ivory">
          Message envoyé. Nous vous répondrons dans les plus brefs délais.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="rounded-2xl border border-terre/40 bg-terre/15 px-5 py-4 text-sm font-semibold text-ivory">
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Nom complet</label>
          <input id="name" name="name" type="text" required maxLength={120} autoComplete="name" placeholder="Votre nom" className="field" disabled={sending} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="vous@exemple.com" className="field" disabled={sending} />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className={label}>Sujet</label>
        <input id="subject" name="subject" type="text" required maxLength={150} placeholder="Comment pouvons-nous aider ?" className="field" disabled={sending} />
      </div>
      <div>
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" rows={5} required maxLength={4000} placeholder="Votre message…" className="field resize-y" disabled={sending} />
      </div>

      {/* Champ piège anti-spam : invisible pour les humains, rempli par les robots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Site web</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={sending} className="btn-sun w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60">
        {sending ? 'Envoi en cours…' : 'Envoyer le message'}
        {sending ? <Spinner /> : <ArrowRight />}
      </button>
    </form>
  )
}
