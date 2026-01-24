// module prep
import fs, { existsSync } from "node:fs";
// import validator from "validator";
// import chalk from "chalk";

// check contact folder
if (!existsSync("./data")) {
  fs.mkdirSync("./data");
}

// check contact file
if (!existsSync("./data/contacts.json")) {
  fs.writeFileSync("./data/contacts.json", "[]", "utf-8");
}

// get current contacts list and convert it to json obj
export const loadContacts = () => {
  const contacts = JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));
  return contacts;
};

// write datas to file
export const addData = (name, email, phone) => {
  const contacts = loadContacts();
  // get answers
  const datas = {
    name,
    email,
    phone,
  };

  // add new contact to list
  contacts.push(datas);

  // change json obj into string and overwrite old list with new list
  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));
};

export const displayList = () => {
  console.log(chalk.bgBlue("Contact List"));
  const contacts = loadContacts();
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.numPhone}`);
  });
};

export const findDetail = (name) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase(),
  );
  return contact;
};

export const displayDetail = (name) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase(),
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
    (contact) => contact.name.toLowerCase() === name.toLowerCase(),
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
