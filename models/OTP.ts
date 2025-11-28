import * as mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";
import { emailTemplate } from "../mails/emailVerificationTemplate.js";

interface IOTP {
  email: string;
  otp: string;
  createdAt?: Date;
}

type OTPDocument = IOTP & mongoose.Document;
type OTPModel = mongoose.Model<OTPDocument>;

async function sendVerificationEmail(
  email: string,
  otp: string
): Promise<void> {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );
    console.log("Email sent successfully: ", mailResponse?.messageId);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

const OTPSchema = new mongoose.Schema<OTPDocument, OTPModel>({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

OTPSchema.post("save", async function (doc: OTPDocument) {
  console.log("New document saved to database");

  try {
    await sendVerificationEmail(doc.email, doc.otp);
  } catch (error) {
    console.log("Error sending verification email:", error);
  }
});

const OTP = mongoose.model<OTPDocument, OTPModel>("OTP", OTPSchema);

export default OTP;
