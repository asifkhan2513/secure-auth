
interface EmailTemplateOptions {
    appName?: string;
    expiresInMinutes?: number;
}

/**
 * Generates an HTML email template for sending an OTP verification code.
 * * @param otp The one-time password (OTP) string to be included in the email.
 * @param options Optional configuration object for customization (app name, expiration time).
 * @returns The complete HTML string for the email body.
 */
export function emailTemplate(otp: string, options: EmailTemplateOptions = {}): string {
    const appName: string = options.appName || "Secure Auth";
    const minutes: number = options.expiresInMinutes || 10;

    return `
        <div style="font-family: Arial, sans-serif; line-height:1.4;">
            <h2 style="margin:0 0 8px 0;">${appName} — Email Verification</h2>
            <p style="margin:0 0 12px 0;">Your verification code is:</p>
            <p style="font-size: 22px; font-weight:700; margin:0 0 12px 0; color:#1f1f1f;">${otp}</p>
            <p style="margin:0 0 12px 0;">This code will expire in ${minutes} minutes.</p>
            <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
            <small style="color:#666;">If you didn't request this, you can safely ignore this email.</small>
        </div>
    `;
}

