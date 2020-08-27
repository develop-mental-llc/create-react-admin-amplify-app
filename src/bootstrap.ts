import readline from "readline";
import { inspect } from "util";

const cliReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isDebug = () => process.env.CRAAA_DEBUG;
const debuglog = (obj: any) => {
  // eslint-disable-next-line
  console.log("*debug*: ", inspect(obj));
};

function questionUser(question: string) {
  return new Promise<string>((resolve, reject) => {
    try {
      cliReader.question(question + "\n", answer => {
        resolve(answer);
        cliReader.pause();
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function main() {
  if (isDebug()) {
    debuglog({
      args: process.argv.slice(2),
      pid: process.pid,
    });
  }

  await questionUser("Welcome to create-react-admin-amplify-app,\npress enter to continue");
}

main();
