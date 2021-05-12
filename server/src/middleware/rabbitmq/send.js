import amqp from "amqplib/callback_api.js";

export const amqpSender = () => {
  console.log("amqpSender");
  amqp.connect("amqp://localhost", function (err0, conn) {
    if (err0) {
      throw err0;
    }

    conn.createChannel(function (err1, ch) {
      if (err1) {
        throw err1;
      }

      let queue = "hello";
      let msg = "Hello World";

      ch.assertQueue(queue, {
        durable: false,
      });

      ch.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () {
      conn.close();
      process.exit(0);
    }, 500);
  });
};

amqpSender(); // Testing
