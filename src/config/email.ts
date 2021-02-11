import nodemailer from 'nodemailer';
import { config } from './config';

export const remetente = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: config.email,
        pass: config.email_password
    }
});

export const emailRecover = {
    from: config.email,
    to: "victor@winn.com.vc",
    subject: "Recuperação de senha",
    text: "Sua nova senha é Nova@1234"
}