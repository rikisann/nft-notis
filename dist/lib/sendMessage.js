import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
export default async function sendMessage(message) {
    console.log("Sending message...");
    const mailOptions = {
        from: `Nft Notis <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: message.subject,
        text: message.text,
    };
    await transporter.sendMail(mailOptions);
    console.log("Sent through!");
}
