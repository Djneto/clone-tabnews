const { spawn } = require("child_process");

const command = "npm";

// Comando que sobe os serviços e roda os testes
const testArgs = [
  "run",
  "services:up",
  "&&",
  "concurrently",
  "--names",
  "next,jest",
  "--hide",
  "next",
  "--kill-others",
  "--success",
  "command-jest",
  '\"next dev\"',
  '\"jest --runInBand\"',
];

const child = spawn(command, testArgs, {
  stdio: "inherit",
  shell: true,
});

// Quando o processo principal (concurrently) termina
child.on("exit", (code) => {
  console.log(`\n🔵 Test process exited with code ${code}`);
  stopServices(code);
});

// Função para encerrar os serviços
function stopServices(code = 0) {
  console.log("🟡 Stopping services...");

  const stop = spawn("npm", ["run", "services:stop"], {
    stdio: "inherit",
    shell: true,
  });

  stop.on("exit", (stopCode) => {
    console.log("\n🟢 Services stopped successfully!\n");
    process.exit(code); // Usa o código original de saída dos testes
  });
}
