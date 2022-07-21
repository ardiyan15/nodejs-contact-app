const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// Create folder if not exists
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Create file if not exists
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

const saveContact = (name, email, phoneNumber) => {
  const data = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(data);

  //   check name duplication
  const duplicate = contacts.find((contact) => contact.name === name);

  if (duplicate) {
    console.log(
      chalk.red.inverse.bold("Contact sudah terdaftar, gunakan nama lain")
    );
    return false;
  }

  //   Chek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email invalid"));
      return false;
    }
  }

  if (!validator.isMobilePhone(phoneNumber, "id-ID")) {
    console.log(chalk.red.inverse.bold("Phone number invalid"));
    return false;
  }

  contacts.push({ name, email, phoneNumber });
  const results = JSON.stringify(contacts);
  fs.writeFileSync("data/contacts.json", results);
  if (email) {
    console.log(
      chalk.green.inverse.bold(
        `Thank you ${name}, your email is ${email} and your phone number is ${phoneNumber}`
      )
    );
  } else {
    console.log(
      chalk.green.inverse.bold(
        `Thank you ${name}, your phone number is ${phoneNumber}`
      )
    );
  }
};

module.exports = { saveContact };
