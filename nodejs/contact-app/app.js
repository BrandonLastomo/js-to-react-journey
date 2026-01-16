import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { saveDatas } from "./functions.js";

yargs(hideBin(process.argv))
  .command(
    "add",
    "Save contact to file",
    {
      name: {
        describe: "Input username",
        type: "string",
        demandOption: true,
      },
      email: {
        describe: "Input user's email",
        type: "string",
        demandOption: false,
      },
      numPhone: {
        describe: "Input user's phone number",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      const datas = {
        name: argv.name,
        email: argv.email,
        numPhone: argv.numPhone,
      };
      saveDatas(argv.name, argv.email, argv.numPhone);
    }
  )
  .parse();
