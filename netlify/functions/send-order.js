const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // store it securely!

exports.handler = async (event) => {
  const { mobile, address, orderList, totalAmount, orderId } = JSON.parse(event.body);

  const msg = {
    to: "sembuashok@gmail.com", // your email
    from: "vanidha.parthiban@gmail.com",
    subject: `New Order #${orderId}`,
    text: `
Order #${orderId}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Mobile: ${mobile}
Address: ${address}

Items:
${orderList}

Total Amount: ₹${totalAmount}
    `,
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};