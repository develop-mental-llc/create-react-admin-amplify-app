import readline from "readline";
import configDeath from "death";
import { statSync } from "fs";
import { resolve } from "path";
import { debuglog, die, questionUser, printLine, spawnAndPrintLine, helpText, skipCra, skipRa } from "./helpers";
import { spawn } from "child_process";

const cliReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function asyncErrorHandler(error: Error) {
  debuglog(error);
  cleanup(0, null);
}

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
  /*********
   * Setup *
   *********/
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
  /*******
   * CRA *
   *******/
  if (!skipCra()) {
    const cra = spawnAndPrintLine("Running create-react-app, please wait...", ["npx", "create-react-app", appName]);
    if (cra.error) {
      die(cra.error.message);
    }
  } else {
    debuglog("skipping create-react-app as CRAAA_SKIP_CRA is set in ENV");
  }
  process.chdir(absoluteProjectPath);
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
  /***********
   * Amplify *
   ***********/
  const amp = spawn("amplify", ["init"]);
  amp.stderr.pipe(process.stderr);
  amp.stdout.pipe(process.stdout);
  process.stdin.pipe(amp.stdin);
  // allow amplify to run and keep CLI alive, register continuation callback
  amp.on("exit", (code, sig) => {
    if (code !== 0 || sig) {
      // amplify died or was killed
      cleanup(code, sig);
    } else {
      afterAmplify().catch(asyncErrorHandler);
    }
  });
}

async function afterAmplify() {
  const ampDeps = spawnAndPrintLine("Adding project amplify dependencies, please wait...", [
    "npm",
    "install",
    "@aws-amplify/core",
    "@aws-amplify/api",
    "@aws-amplify/auth",
  ]);
  if (ampDeps.error) {
    die(ampDeps.error.message);
  }
  /******
   * RA *
   ******/
  if (!skipRa()) {
    const ra = spawnAndPrintLine("Adding react-admin, please wait...", ["npm", "install", "react-admin-amplify"]);
    if (ra.error) {
      die(ra.error.message);
    }
  } else {
    debuglog("skipping react-admin as CRAAA_SKIP_RA is set in ENV");
  }
  /******************
   * Amplify add api *
   *******************/
  const api = spawnAndPrintLine("Provisioning Amplify api, please wait...", ["amplify", "add", "api"]);
  if (api.error) {
    die(api.error.message);
  }
  /**********************
   * GraphQl generation *
   **********************/
  const response = await questionUser(cliReader, `Push Amplify project to the AWS cloud now? (y/n)`);
  debuglog({ response });
  let ok = false;
  if (/^y$/i.test(response)) {
    ok = true;
  }
  if (!ok) {
    const gen = spawnAndPrintLine("Adding amplify codegen, please wait...", ["amplify", "add", "codegen"]);
    if (gen.error) {
      die(gen.error.message);
    }
    const gql = spawnAndPrintLine("Generating GraphQl files, please wait...", ["amplify", "codegen"]);
    if (gql.error) {
      die(gql.error.message);
    }
  } else {
    const gql = spawnAndPrintLine("Pushing to AWS, please wait...", ["amplify", "push"]);
    if (gql.error) {
      die(gql.error.message);
    }
  }
}

main().catch(asyncErrorHandler);
