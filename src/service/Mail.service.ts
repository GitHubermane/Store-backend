import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

class MailService {
    transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        } as SMTPTransport.Options)
    }
    async sendActiveMail(email: string, link: string) {

        await this.transporter.sendMail({
            from: `"Проверка" < ${process.env.SMTP_USER}> `,
            to: email,
            subject: `Активация аккаунта на ${process.env.API_URL} `,
            text: 'Проверка',
            html:
                `
                <div>
                    <h1>Попытка изучить < /h1>
                    <a href = ${link}> ${link} </a>
                </div>
                `
        })
    }
}
export default new MailService()