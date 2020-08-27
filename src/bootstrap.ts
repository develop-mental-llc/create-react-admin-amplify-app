import readline from "readline";
import { statSync } from "fs";
import { resolve } from "path";
import { debuglog, die, questionUser, printLine, spawnAndPrintLine, spawnAsyncAndPrintLine } from "./helpers";

const cliReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  debuglog({
    args: process.argv.slice(2),
    pid: process.pid,
  });
  printLine("Welcome to Create React Admin Amplify App!");
  /**
   * Setup
   */
  const appName = await questionUser(cliReader, "Name for your app:");
  const response = await questionUser(
    cliReader,
    `Using folder '${appName}' at current path '${process.cwd()}'. Is this ok? (y/n)`
  );
  const absoluteProjectPath = resolve(process.cwd(), appName);
  debuglog({ response });
  debuglog({ absoluteProjectPath });
  let ok = false;
  if (/^y$/i.test(response)) {
    ok = true;
  }
  if (!ok) {
    die("aborted");
  }
  try {
    const stat = statSync(absoluteProjectPath);
    if (!stat.isDirectory()) {
      throw Error(`folder ${absoluteProjectPath} exists but is not a folder. Please remove it or use another name`);
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
  /**
   * CRA
   */
  const cra = spawnAndPrintLine("Running create-react-app, please wait...", ["npx", "create-react-app", appName]);
  if (cra.error) {
    die(cra.error.message);
  }
  /**
   * RA
   */
  const ra = spawnAndPrintLine("Adding react-admin, please wait...", [
    "npm",
    "install",
    "@aws-amplify/core",
    "@aws-amplify/api",
    "@aws-amplify/auth",
    "react-admin-amplify",
  ]);
  if (ra.error) {
    die(ra.error.message);
  }
  process.chdir(absoluteProjectPath);
  printLine("");
  printLine("Amplify setup instructions:");
  printLine("name:                   press Enter (accept default)");
  printLine("environment:            press Enter (accept default)");
  printLine("default editor:         choose");
  printLine("type of app:            choose");
  printLine("javascript framework:   choose");
  printLine("source directory:       press Enter (accept default)");
  printLine("distribution directory: press Enter (accept default)");
  printLine("start command:          press Enter (accept default)");
  printLine("build command:          press Enter (accept default)");
  printLine("aws profile:            choose");
  printLine("You will need to provide AWS credentials, see:");
  printLine("https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html");
  printLine("https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_identity-management.html");
  await questionUser(cliReader, "Press Enter when ready");
  cliReader.pause();
  /**
   * Amplify
   */
  const amp = spawnAsyncAndPrintLine("", ["amplify", "init"]);
  amp.stderr.pipe(process.stderr);
  amp.stdout.pipe(process.stdout);
  process.stdin.pipe(amp.stdin);
}

// eslint-disable-next-line
main().catch(error => console.log(error));
