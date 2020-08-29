import readline from "readline";
import configDeath from "death";
import { statSync } from "fs";
import { resolve } from "path";
import {
  debuglog,
  die,
  questionUser,
  printLine,
  spawnAndPrintLine,
  spawnAsyncAndPrintLine,
  helpText,
  skipCra,
  skipRa,
} from "./helpers";

const cliReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function cleanup(code, sig) {
  debuglog({ code, sig });
  cliReader.close();
  console.time("Done in");
  if (/^SIG/.test(code)) {
    die("aborted");
  } else {
    process.exit(0);
  }
}

async function main() {
  console.time("Done in");
  const onDeath = configDeath({ uncaughtException: true, SIGHUP: true });
  onDeath(cleanup);
  const args = process.argv.slice(2);
  debuglog({
    args,
    pid: process.pid,
  });
  if (args[0] == "-h" || args[0] == "--help" || /^--?/.test(args[0])) {
    helpText();
    return;
  }
  let appName = args[0];
  printLine("Welcome to Create React Admin Amplify App!");
  /**
   * Setup
   */
  if (!appName) {
    const name = await questionUser(cliReader, "Name for your app:");
    appName = name;
  }
  const response = await questionUser(
    cliReader,
    `Project will be created at '${process.cwd()}/${appName}'. Is this ok? (y/n)`
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
  if (!skipCra()) {
    const cra = spawnAndPrintLine("Running create-react-app, please wait...", ["npx", "create-react-app", appName]);
    if (cra.error) {
      die(cra.error.message);
    }
  } else {
    debuglog("skipping create-react-app as CRAAA_SKIP_CRA is set in ENV");
  }
  /**
   * RA
   */
  if (!skipRa()) {
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
  } else {
    debuglog("skipping react-admin as CRAAA_SKIP_RA is set in ENV");
  }
  process.chdir(absoluteProjectPath);
  printLine("");
  printLine("Amplify setup will begin, it is interactive");
  printLine("- Accept the default name (press Enter)");
  printLine("- Accept the default build and run scripts (press Enter)");
  printLine("- Accept the default source & distribution directories (press Enter)");
  printLine("- Accept other options as you like, most of the time the default is fine");
  printLine("- You will need to provide AWS credentials, see:");
  printLine("https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html");
  printLine("https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_identity-management.html");
  await questionUser(cliReader, "Press Enter to begin");
  cliReader.pause();
  /**
   * Amplify
   */
  const amp = spawnAsyncAndPrintLine("", ["amplify", "init"]);
  amp.stderr.pipe(process.stderr);
  amp.stdout.pipe(process.stdout);
  process.stdin.pipe(amp.stdin);
  // allow amplify to run and keep CLI alive, register continuation callback
  amp.on("exit", cleanup);
}

main()
  // eslint-disable-next-line no-console
  .catch(error => console.log(error));
