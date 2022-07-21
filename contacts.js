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

const loadContact = () => {
  const data = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(data);

  return contacts;
};

const saveContact = (name, email, phoneNumber) => {
  //   const data = fs.readFileSync("data/contacts.json", "utf-8");
  //   const contacts = JSON.parse(data);

  const contacts = loadContact();

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

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold(`List Data : `));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.phoneNumber}`);
  });
};

const detailContact = (name) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${name} not found`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(contact.name));
  console.log(contact.phoneNumber);

  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (name) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${name} not found`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold(`${name} deleted successfully`));
};

module.exports = { saveContact, listContact, detailContact, deleteContact };
