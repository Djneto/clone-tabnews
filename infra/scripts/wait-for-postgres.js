const { exec } = require("node:child_process");
const TerminalLoader = require("./terminal-loader");

TerminalLoader.start("Waiting for Postgres to accept connections");

function checkPostgres() {
  exec(
    "docker exec postgres-dev pg_isready --host localhost",
    (error, stdout) => {
      if (stdout.search("accepting connections") === -1) {
        checkPostgres();
        return;
      }
      TerminalLoader.stop("Postgres is ready and accepting connections!\n");
    },
  );
}

checkPostgres();
