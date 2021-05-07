import nodemailer from "nodemailer";
import moment from "moment";

const formatDate = (date) => {
  const dateObj = new Date(date);
  const momentObj = moment(dateObj);
  const formattedDate = momentObj.format("MMMM Do YYYY");
  return formattedDate;
};

const baseEmail = {
  from: '"BUG TRACKER" <noreply@mpaccione.com>', // sender address
  to: "mpaccione1991@gmail.com", // list of receivers
  subject: "Bug Report", // Subject line
};

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail({ type, data }) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const {
    /* TODO: Data goes here */
  } = data;

  ////////////////////////////
  // Engineer Email Content //
  ////////////////////////////

  const bugReportText = `<h1>HTML GOES HERE</h1>`;

  const bugReportEmail = Object.assign(baseEmail, {
    text: bugReportText, // plain text body
    html: bugReportText, // html body,
  });

  // send mail with defined transport object
  try {
    const sentBugReportEmail = await transporter.sendMail(bugReportEmail);

    console.log("Message sent: %s", sentBugReportEmail.messageId);
    console.log(
      "Preview URL: %s",
      nodemailer.getTestMessageUrl(sentBugReportEmail)
    );
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (err) {
    console.error(err);
  }
}

// TEST VALUES

// sendMail({ type, data }).catch(console.error);
