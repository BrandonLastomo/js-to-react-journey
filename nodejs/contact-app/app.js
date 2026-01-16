import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  saveDatas,
  displayList,
  displayDetail,
  deleteContact,
} from "./functions.js";

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
      saveDatas(argv.name, argv.email, argv.numPhone);
    }
  )
  .command("list", "Display contact list", () => {
    displayList();
  })
  .command(
    "detail",
    "Display details of a contact",
    {
      name: {
        describe: "Search contact",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      displayDetail(argv.name);
    }
  )
  .command(
    "delete",
    "Delete a contact",
    {
      name: {
        describe: "Search a contact",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      deleteContact(argv.name);
    }
  )
  .parse();
