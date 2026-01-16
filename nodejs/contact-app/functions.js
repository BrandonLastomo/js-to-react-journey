// module prep
import fs from "node:fs";
import validator from "validator";
import chalk from "chalk";

// write datas to file
export const saveDatas = (name, email, numPhone) => {
  // get answers
  const datas = {
    name,
    email,
    numPhone,
  };

  // get current contacts list and convert it to json obj
  let contacts = JSON.parse(fs.readFileSync("./contacts.json", "utf-8"));

  // check valid email
  if (!validator.isEmail(datas.email)) {
    console.log(chalk.bgRed("Email invalid"));
    return false;
  }
  // check phone number
  if (!validator.isMobilePhone(datas.numPhone, "id-ID")) {
    console.log(chalk.bgRed("Phone number invalid"));
    return false;
  } else if (contacts.find((contact) => contact.numPhone === datas.numPhone)) {
    console.log(chalk.bgRed("Phone number already registered"));
    return false;
  }

  // add new contact to list
  contacts.push(datas);

  // change json obj into string and overwrite old list with new list
  fs.writeFileSync("./contacts.json", JSON.stringify(contacts));

  // give notification and current contact list
  console.log(chalk.bgGreen("Success!"));
  console.log(contacts);
};
