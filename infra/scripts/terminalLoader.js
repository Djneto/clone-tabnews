const TerminalLoader = {
  frames: ["- ", "\\ ", "| ", "/ "],
  interval: 100,
  index: 0,
  spinnerInterval: null,

  start: function (message = "Aguardando...") {
    this.spinnerInterval = setInterval(() => {
      process.stdout.write(`\r🟡 ${message} ${this.frames[this.index]}`);
      this.index = (this.index + 1) % this.frames.length;
    }, this.interval);
  },

  stop: function (finalMessage = "", isError = false) {
    clearInterval(this.spinnerInterval);
    process.stdout.write("\r"); // Limpa a linha

    if (finalMessage) {
      const prefix = isError ? "🔴" : "🟢";
      console.log(`${prefix} ${finalMessage}`);
    }
  },
};

module.exports = TerminalLoader;
