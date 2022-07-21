const yargs = require("yargs");

const contacts = require("./contacts");

yargs.command({
  command: "add",
  describe: "Create new contact",
  builder: {
    name: {
      describe: "Fullname",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Email",
      demandOption: false,
      type: "string",
    },
    phoneNumber: {
      describe: "Phone Number",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const contact = {
      name: argv.name,
      email: argv.email,
      phoneNumber: argv.phoneNumber,
    };
    contacts.saveContact(argv.name, argv.email, argv.phoneNumber);
  },
});

yargs.parse();
