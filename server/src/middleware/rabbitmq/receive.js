import amqp from "amqplib/callback_api.js";

export const amqpReceiver = () => {
  console.log("amqpReceiver");
  amqp.connect("amqp://localhost", function (err0, conn) {
    if (err0) {
      throw err0;
    }

    conn.createChannel(function (err1, ch) {
      if (err1) {
        throw err1;
      }

      let queue = "hello";

      ch.assertQueue(queue, {
        durable: false,
      });

      ch.consume(
        queue,
        function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
        },
        { noAck: true }
      );
    });
  });
};

amqpReceiver(); // Testing
