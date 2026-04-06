import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, date, time, guests, message } = body

    if (!name || !email || !date || !time || !guests) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    // Sauvegarde en base
    const reservation = await prisma.reservation.create({
      data: {
        name,
        email,
        phone: phone || null,
        date: new Date(`${date}T${time}:00`),
        guests: parseInt(guests),
        message: message || null,
        status: 'PENDING',
      },
    })

    // Email de confirmation au client
    await resend.emails.send({
      from: 'El Humo <onboarding@resend.dev>',
      to: email,
      subject: '✅ Votre réservation chez El Humo',
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #F5F0E8; padding: 40px; border-radius: 16px;">
          <h1 style="color: #2C1A0E; font-size: 28px; margin-bottom: 8px;">El <span style="color: #C2622D;">Humo</span></h1>
          <p style="color: #8B5E3C; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 32px;">Cuisine mexicaine premium</p>

          <h2 style="color: #2C1A0E; font-size: 22px; margin-bottom: 16px;">Réservation confirmée 🎉</h2>
          <p style="color: #5C3D2A; font-size: 15px; line-height: 1.6;">
            Bonjour <strong>${name}</strong>, nous avons bien reçu votre réservation. À très vite !
          </p>

          <div style="background: white; border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid #E8DCC8;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #8B5E3C; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Date</td>
                <td style="padding: 8px 0; color: #2C1A0E; font-weight: bold; text-align: right;">${new Date(`${date}T${time}:00`).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
              <tr style="border-top: 1px solid #E8DCC8;">
                <td style="padding: 8px 0; color: #8B5E3C; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Heure</td>
                <td style="padding: 8px 0; color: #2C1A0E; font-weight: bold; text-align: right;">${time}</td>
              </tr>
              <tr style="border-top: 1px solid #E8DCC8;">
                <td style="padding: 8px 0; color: #8B5E3C; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Couverts</td>
                <td style="padding: 8px 0; color: #2C1A0E; font-weight: bold; text-align: right;">${guests} personne${parseInt(guests) > 1 ? 's' : ''}</td>
              </tr>
              ${message ? `<tr style="border-top: 1px solid #E8DCC8;"><td style="padding: 8px 0; color: #8B5E3C; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Message</td><td style="padding: 8px 0; color: #2C1A0E; text-align: right;">${message}</td></tr>` : ''}
            </table>
          </div>

          <div style="background: #2C1A0E; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="color: #C2622D; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Adresse</p>
            <p style="color: white; font-size: 15px; margin: 0;">42 Rue de la Fumée, 75011 Paris</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 4px 0 0 0;">01 23 45 67 89</p>
          </div>

          <p style="color: #8B5E3C; font-size: 13px; text-align: center;">
            Pour annuler ou modifier, contactez-nous au <strong style="color: #2C1A0E;">01 23 45 67 89</strong>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, id: reservation.id })
  } catch (error) {
    console.error('Erreur réservation:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
