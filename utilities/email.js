const nodeMailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(url) {
    this.to = "test@yahoo.com";
    // this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Clint Hooker <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Mail Application
      return 1;
    }
    return nodeMailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 25,
      auth: {
        user: "8db097cd6297a6",
        pass: "475e87483ccfa3",
      },
    });
  }

  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../view/email/${template}.pug`, {
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: "test@test@io.com",
      to: "test@test@io.com",
      subject,
      html,
      // text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Bird Dog Defense Family!");
  }
};

// const sendEmail = () => {
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };
