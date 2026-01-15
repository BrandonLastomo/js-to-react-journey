const chalk = require("chalk");
const validator = require("validator");
// validator
let dummy = "lorem ipsum dolor sit amet";
console.log(validator.contains(dummy, "sit")); // check if dummy contains sit = true
console.log(validator.isStrongPassword("admin123")); // check if admin123 is a strong password = false
// chalk (ver 4.1.0)
console.log(chalk.blue("hello"));
console.log(chalk`hello {bgRed.bold World}!`); // template literal
