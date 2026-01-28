import { NextResponse } from 'next/server';

/**
 * Endpoint léger pour vérifier que le site répond (diagnostic d'accès depuis différentes régions).
 * GET /api/health → { ok: true }
 */
export async function GET() {
  return NextResponse.json({ ok: true });
}
