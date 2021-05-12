import amqp from "amqplib/callback_api.js";

export const amqpNewTask = () => {
  console.log("amqpNewTask");
  amqp.connect("amqp://localhost", function (err0, conn) {
    if (err0) {
      throw err0;
    }

    conn.createChannel(function (err1, ch) {
      if (err1) {
        throw err1;
      }

      let queue = "task_queue";
      let msg = process.argv.slice(2).join(' ') || `${Math.random()} Hello World.....`;

      ch.assertQueue(queue, {
        durable: true,
      });

      ch.sendToQueue(queue, Buffer.from(msg), {
          persistent: true
      });
      console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () {
      conn.close();
      process.exit(0);
    }, 500);
  });
};

amqpNewTask(); // Testing
