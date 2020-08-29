import { Interface } from "readline";
import { inspect } from "util";
import { spawnSync } from "child_process";

export const isDebug = () => process.env.CRAAA_DEBUG;
export const skipCra = () => process.env.CRAAA_SKIP_CRA;
export const skipRa = () => process.env.CRAAA_SKIP_RA;
export const debuglog = (obj: any) => {
  if (!isDebug()) {
    return;
  }
  // eslint-disable-next-line
  console.log("*debug*: ", inspect(obj));
};
export const printLine = (message: string) => {
  process.stdout.write(message + "\n");
};
export const die = (message: string) => {
  printLine(message);
  process.exit(1);
};

export function questionUser(reader: Interface, question: string) {
  return new Promise<string>((re, reject) => {
    try {
      reader.question(question + "\n", answer => {
        re(answer);
        reader.pause();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function spawnAndPrintLine(message: string, info: string[]) {
  printLine(`CRAAA: ${message}`);
  return spawnSync(info[0], info.slice(1));
}

export function helpText() {
  printLine("usage: create-react-admin-amplify-app [name]");
  printLine("Installs create-react-app, react-admin, amplify and configures boilerplate code");
}
