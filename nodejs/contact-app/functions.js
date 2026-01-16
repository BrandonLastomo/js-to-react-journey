// module prep
import fs from "node:fs";
import validator from "validator";
import chalk from "chalk";

// get current contacts list and convert it to json obj
const loadContacts = () =>
  JSON.parse(fs.readFileSync("./contacts.json", "utf-8"));

// write datas to file
export const saveDatas = (name, email, numPhone) => {
  const contacts = loadContacts();
  // get answers
  const datas = {
    name,
    email,
    numPhone,
  };

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

export const displayList = () => {
  console.log(chalk.bgBlue("Contact List"));
  const contacts = loadContacts();
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.numPhone}`);
  });
};

export const displayDetail = (name) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  if (contact) {
    console.log(chalk.bgGreen(`Contact Detail of ${contact.name}: `));
    console.log(`${contact.name}, ${contact.email}, ${contact.numPhone}`);
  } else {
    console.log(chalk.bgRed("Name not found"));
    return false;
  }
};

export const deleteContact = (name) => {
  const contacts = loadContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  if (contactIndex) {
    contacts.splice(contactIndex, 1);
    fs.writeFileSync("./contacts.json", JSON.stringify(contacts));
    console.log(chalk.bgGreen("Contact deleted"));
  } else {
    console.log(chalk.bgRed("Name not found"));
    return false;
  }
};
