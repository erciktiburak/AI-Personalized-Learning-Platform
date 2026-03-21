import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  static async sendWelcomeEmail(to: string, name: string) {
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to,
        subject: 'LearnPath AI\'ya Hoş Geldin!',
        html: `<p>Merhaba <strong>${name}</strong>,</p><p>LearnPath AI ile kişiselleştirilmiş öğrenme yolculuğuna başlamaya hazır mısın?</p><p>Hemen bir seviye testi çözerek başlayabilirsin!</p>`,
      });
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }
}
