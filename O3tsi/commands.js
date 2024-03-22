/* eslint-disable @typescript-eslint/no-unused-vars */

const qs = require('qs');
let item;

Office.onReady((info) => {
  // If needed, Office.js is ready to be called
    if (info.host === Office.HostType.Outlook) {
      item = Office.context.mailbox.item;
      const subject = item.subject;
      console.log(`Email subject: ${subject}`);
      // Assume you have an array of category names you want to add
      const categoriesToAdd = ["Send to Salesforce"];
      // Add the categories to the item
      Office.context.mailbox.item.categories.addAsync(categoriesToAdd, (asyncResult) => {
          if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
              console.log("Successfully added categories to the item.");
          } else {
              console.error("Error adding categories: " + asyncResult.error.message);
          }
      });
  }
});

/* function getSubject() {
  item.subject.getAsync((asyncResult) => {
      if (asyncResult.status === Office.AsyncResultStatus.Failed) {
          console.error(asyncResult.error.message);
          return;
      }
      const subject = asyncResult.value;
      console.log(`The subject is: ${subject}`);
  });
}
 */
/* function assignRedCategory() {
  // Check if the item already has the Red Category
  if (!item.categories.includes("Red Category")) {
      item.categories.push("Red Category");
      item.saveAsync((asyncResult) => {
          if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
              console.log("Red category assigned successfully!");
          } else {
              console.error("Error assigning Red category:", asyncResult.error.message);
          }
      });
  } else {
      console.log("Item already has the Red Category.");
  }
} */

/**
 * Shows a notification when the add-in command is executed.
 * @param event {Office.AddinCommands.Event}
 */

async function action(event) {
  const message = {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: "Performed action.",
    icon: "Icon.80x80",
    persistent: true,
  };

  // Show a notification message
  Office.context.mailbox.item.notificationMessages.replaceAsync("action", message);
  
  // Be sure to indicate when the add-in command function is complete
  event.completed();
}

function getGlobal() {
  return typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : undefined;
}

const g = getGlobal();

// The add-in command functions need to be available in global scope
g.action = action;
