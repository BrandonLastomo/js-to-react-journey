// module prep
const fs = require("node:fs");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

// create file if not exist
if (!fs.existsSync("./contacts.json")) {
  fs.writeFileSync("./contacts.json", "[]", "utf-8");
}

// handle callback hell
const writeQuestion = (q) => {
  return new Promise((resolve, reject) => {
    rl.question(q, (data) => {
      resolve(data); // get the data ONLY after user done inputting the data
    });
  });
};

// write datas to file
const saveDatas = (name, email, numPhone) => {
  // get answers
  const datas = {
    name,
    email,
    numPhone,
  };
  // get current contacts list and convert it to json obj
  let contacts = JSON.parse(fs.readFileSync("./contacts.json", "utf-8"));
  // add new contact to list
  contacts.push(datas);

  // change json obj into string and overwrite old list with new list
  fs.writeFileSync("./contacts.json", JSON.stringify(contacts));

  // give notification and current contact list
  console.log("Success!");
  console.log(contacts);

  rl.close();
};

module.exports = {
  writeQuestion,
  saveDatas,
};
