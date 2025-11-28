import * as nodemailer from "nodemailer";
interface MailResponse {
  accepted: string[];
  rejected: string[];
  envelope: {
    from: string;
    to: string[];
  };
  messageId: string;
}

export const mailSender = async (
  email: string,
  title: string,
  body: string
): Promise<MailResponse | undefined> => {
  try {
    const host: string = process.env.MAIL_HOST as string;
    const user: string = process.env.MAIL_USER as string;
    const pass: string = process.env.MAIL_PASS as string;

    let transporter = nodemailer.createTransport({
      host: host,
      auth: {
        user: user,
        pass: pass,
      },
    });

    let info: MailResponse = (await transporter.sendMail({
      from: "Secure Backend || by Asif",
      to: email,
      subject: title,
      html: body,
    })) as MailResponse;

    console.log(info);
    return info;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
    return undefined;
  }
};
