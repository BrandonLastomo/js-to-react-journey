// filesystem
const fs = require("node:fs");
// writeFile
// sync
// try {
//   fs.writeFileSync("nodejs/core-modules/data.txt", "This is datas");
//   console.log("success");
// } catch (error) {}
// async
// fs.writeFile(
//   "nodejs/core-modules/data.txt",
//   "this is datas using async",
//   (err) => {
//     if (err) throw err;
//     console.log("success");
//   }
// );
// readFile
// sync
// const datas = fs.readFileSync("nodejs/core-modules/data.txt", "utf-8");
// console.log(datas);
// async
// fs.readFile("nodejs/core-modules/data.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// readline
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });
// rl.question("How are u?", (ans) => {
//   console.log(ans);
//   rl.close();
// });
// exercise
// give questions
rl.question("input ur name: ", (name) => {
  rl.question("input num phone: ", (phone) => {
    // get answers
    const datas = {
      name,
      phone,
    };
    // get current contacts list and convert it to json obj
    let contacts = JSON.parse(
      fs.readFileSync("nodejs/core-modules/contacts.json", "utf-8")
    );
    // add new contact to list
    contacts.push(datas);

    // change json obj into string and overwrite old list with new list
    fs.writeFileSync(
      "nodejs/core-modules/contacts.json",
      JSON.stringify(contacts)
    );

    // give notification and current contact list
    console.log("Success!");
    console.log(contacts);

    rl.close();
  });
});
