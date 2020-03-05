const Firmata = require("firmata");
const board = new Firmata("/dev/ttyACM0");

board.on("ready", () => {

  console.log("Arduino is ready");

  const input = 12;
  const output = 13;
  let state = 1;

  board.pinMode(input, board.MODES.INPUT);
  board.pinMode(output, board.MODES.OUTPUT);

  board.digitalRead(input, value => {
    if (value === board.HIGH) {
      state = (state + 1) % 2;
      console.log(state === 1 ? "On" : "Off");
      board.digitalWrite(output, state);
    } else {
      console.log("Release");
    }
  });

});
