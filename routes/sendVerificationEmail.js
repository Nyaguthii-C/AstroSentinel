//  module for sending verification email

const nodemailer = require('nodemailer');
const { google } = require("googleapis");

async function sendVerificationEmail(email, verificationToken) {
    try {
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });

        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    reject("Failed to create access token :(");
                }
                resolve(token);
            });
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                accessToken,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'AstroSentinel - Email Verification',
            text: `Thank you for signing up on Astrosentinel./n Click the following link to verify your email: https://www.kenyanastro.tech/verify/${encodeURIComponent(verificationToken)}`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Failed to send verification email:', error);
        throw new Error('Failed to send verification email');
    }
}

module.exports = sendVerificationEmail;
