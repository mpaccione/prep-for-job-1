import amqp from "amqplib/callback_api.js";

export const amqpWorker = () => {
  console.log("amqpWorker");
  amqp.connect("amqp://localhost", function (err0, conn) {
    if (err0) {
      throw err0;
    }

    conn.createChannel(function (err1, ch) {
      if (err1) {
        throw err1;
      }

      let queue = "task_queue";
      
      ch.assertQueue(queue, {
        durable: true,
      });

      ch.prefetch(1)

      ch.consume(queue, function(msg) {
          const secs = msg.content.toString().split('.').length - 1;
          console.log(" [x] Received %s", msg.content.toString())
          setTimeout(function(){
              console.log(" [x] %s Done", msg.content.toString().substring(0, 18))   
          }, secs * 1000)
      }, {
          noAck: true
      });
    });
  });
};

amqpWorker(); // Testing
