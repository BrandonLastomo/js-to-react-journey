// module prep
import fs, { existsSync } from "node:fs";
import { type } from "node:os";

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
export const addData = (name, phone, email) => {
  const contacts = loadContacts();
  // get answers
  const datas = {
    name,
    phone,
    email,
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

export const findContact = (name) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase(),
  );
  return contact;
};

export const findPhone = (phone) => {
  const contacts = loadContacts();
  const contact = contacts.find((contact) => contact.phone == phone);
  return contact;
};

export const editContact = (newData) => {
  const contacts = loadContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.phone == newData.oldPhone,
  );
  delete newData.oldPhone;
  contacts.splice(contactIndex, 1, newData);
  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));
};

export const deleteContact = (name) => {
  const contacts = loadContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.name.toLowerCase() === name.toLowerCase(),
  );
  contacts.splice(contactIndex, 1);
  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));
};
