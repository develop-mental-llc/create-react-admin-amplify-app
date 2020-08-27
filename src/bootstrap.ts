import readline from "readline";
import { inspect } from "util";
import { execSync } from "child_process";
import { mkdirSync, readdirSync, statSync } from "fs";
import { resolve } from "path";

const cliReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isDebug = () => process.env.CRAAA_DEBUG;
const debuglog = (obj: any) => {
  if (!isDebug()) {
    return;
  }
  // eslint-disable-next-line
  console.log("*debug*: ", inspect(obj));
};
const printLine = (message: string) => {
  process.stdout.write(message + "\n");
};
const die = (message: string) => {
  printLine(message);
  process.exit(1);
};

function questionUser(question: string) {
  return new Promise<string>((re, reject) => {
    try {
      cliReader.question(question + "\n", answer => {
        re(answer);
        cliReader.pause();
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function main() {
  debuglog({
    args: process.argv.slice(2),
    pid: process.pid,
  });

  printLine("Welcome to Create React Admin Amplify App!");
  /**
   * Create React App
   */
  const appName = await questionUser("Name for your app:");
  const response = await questionUser(
    `Making folder ${appName} at current path ${process.cwd()} and running create-react-app. Is this ok? (y/n)`
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
    if (error.code === "ENOENT") {
      mkdirSync(absoluteProjectPath);
    } else {
      throw error;
    }
  }
  const folderResult = await readdirSync(absoluteProjectPath);
  debuglog({ folderResult });
  if (folderResult.length) {
    throw Error(`folder ${absoluteProjectPath} is not empty. Please remove it or use another name`);
  }
}

// eslint-disable-next-line
main().catch(error => console.log(error));
