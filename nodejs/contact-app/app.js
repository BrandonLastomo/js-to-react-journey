// module prep
const { writeQuestion, saveDatas } = require("./functions");

const main = () => {
  const name = writeQuestion("input ur name: ");
  const email = writeQuestion("input email: ");
  const numPhone = writeQuestion("input num phone: ");

  saveDatas(name, email, numPhone);
};

main();
