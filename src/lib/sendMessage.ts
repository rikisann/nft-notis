import nodemailer from "nodemailer";

export type Message = {
  subject: string;
  text: string;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "REDACTED_EMAIL",
    pass: "REDACTED_APP_PASSWORD",
  },
});

export default async function sendMessage(message: Message) {
  console.log("Sending message...");
  const mailOptions = {
    from: "Nft Notis <REDACTED_EMAIL>",
    to: "REDACTED_PHONE_GATEWAY",
    subject: message.subject,
    text: message.text,
  };

  await transporter.sendMail(mailOptions);
  console.log("Sent through!");
}

// console.log("Sending message...");
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   auth: {
//     user: "REDACTED_EMAIL",
//     pass: "REDACTED_APP_PASSWORD_2",
//   },
// });

// const response = transporter.sendMail({
//   from: '"nft noti" <REDACTED_EMAIL>',
//   to: "REDACTED_PHONE_GATEWAY_2",
//   subject: message.subject,
//   text: message.text,
// });

// console.log("Sent message");
