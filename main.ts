import nodemailer from "npm:nodemailer";

const smtp_host = Deno.env.get("SMTP_HOST") as string;
const smtp_port = Deno.env.get("SMTP_PORT") as string;
const smtp_user = Deno.env.get("SMTP_USER") as string;
const smtp_password = Deno.env.get("SMTP_PASSWORD") as string;
const smtp_from_email = Deno.env.get("SMTP_FROM_EMAIL") as string;
const smtp_to_email = Deno.env.get("SMTP_TO_EMAIL") as string;
const smtp_use_tls = Deno.env.get("SMTP_USE_TLS") as string;

console.log("SMTP Host:", smtp_host);
console.log("SMTP Port:", smtp_port);
console.log("SMTP User:", smtp_user);
console.log("SMTP Password:", smtp_password);
console.log("SMTP From Email:", smtp_from_email);
console.log("SMTP To Email:", smtp_to_email);
console.log("SMTP Use TLS:", smtp_use_tls);

const transporter = nodemailer.createTransport({
   host: smtp_host,
   port: parseInt(smtp_port),
   secure: smtp_use_tls.toLowerCase() === "true", // true for port 465, false for other ports
   auth: {
      user: smtp_user,
      pass: smtp_password,
   },
});

try {
   const timestamp = new Date().toISOString();
   const info = await transporter.sendMail({
      from: smtp_from_email, // sender address
      to: smtp_to_email, // list of receivers
      subject: "Hello from smtptest (nodemailer)!", // Subject line
      text: `Hello, this is a test email sent from smtptest(nodemailer)! Timestamp: ${timestamp}`, // plain text body
   });
   console.log(info);
   console.log("Email sent successfully!");
} catch (error) {
   console.error(error);

}