const yargs = require("yargs");

const contacts = require("./contacts");

yargs
  .command({
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
      contacts.saveContact(argv.name, argv.email, argv.phoneNumber);
    },
  })
  .demandCommand();

// Display all contacts
yargs.command({
  command: "list",
  describe: "Display all contacts",
  handler() {
    contacts.listContact();
  },
});

// Display contact detail
yargs.command({
  command: "detail",
  describe: "Display contact detail by name",
  builder: {
    name: {
      describe: "Fullname",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.name);
  },
});

// Delete contact by name
yargs.command({
  command: "delete",
  describe: "Delete contact by name",
  builder: {
    name: {
      describe: "Fullname",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.name);
  },
});

yargs.parse();
