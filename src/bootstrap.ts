import readline from "readline";
import { mkdirSync, readdirSync, statSync } from "fs";
import { resolve } from "path";
import { debuglog, die, questionUser, printLine } from "./helpers";

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
   * Create React App
   */
  const appName = await questionUser(cliReader, "Name for your app:");
  const response = await questionUser(
    cliReader,
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
