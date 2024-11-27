import { readFileSync } from "fs";
import handlebars from "handlebars";
import * as nodemailer from "nodemailer";

const { compile } = handlebars;

export interface SendEmailPayload {
  readonly template: string;
  readonly data: object;
  readonly from: string;
  readonly to: string;
  readonly subject: string;
}

const sendEmail = async (payload: SendEmailPayload) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    localAddress: process.env.EMAIL_LOCAL_IP,
  });

  try {
    const templateHtml = readFileSync(`./src/templates/${payload.template}`, "utf8");
    await transporter.sendMail({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      html: compile(templateHtml)(payload.data),
    });
  } catch (error) {
    console.log(error);
  }
};

export { sendEmail };
