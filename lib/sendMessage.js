import nodemailer from "nodemailer";

export default function sendMessage({
  traitType,
  traitValue,
  price,
  floorPrice,
  name,
  link,
}) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "REDACTED_EMAIL",
      pass: "REDACTED_APP_PASSWORD_2",
    },
  });

  const text = `\nPrice: ${price.toFixed(
    2
  )} SOL\nTrait Floor Price: ${floorPrice.toFixed(2)} SOL\nFloor difference: ${(
    floorPrice - price
  ).toFixed(2)} SOL\n${traitType} - ${traitValue}\n${link}`;

  transporter.sendMail({
    from: '"y00t noti" <REDACTED_EMAIL>',
    to: "REDACTED_PHONE_GATEWAY_2",
    subject: name,
    text,
  });
}
