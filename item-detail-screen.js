// IMPORTANT! IMPORTANT!
// ---------------------------------------------------------------------
// ALL SCREEN CLASSES HAVE A this.state INSTANCE VARIABLE THAT HOLDS THE
// APPLICATION STATE CREATED IN THE program.js. WHENEVER YOUR CODE NEEDS
// TO INTERACT WITH THE STATE IN ONE OF THE FOLLOWING CLASSES, DO IT
// THROUGH THE this.state INSTANCE VARIABLE.

class ItemDetailScreen {
  constructor(rl, state, index) {
    this.rl = rl;
    this.state = state;
    this.index = index;
  }

  printNoteUi(text, complete) {
    console.clear();
    console.log("********************************************");
    console.log("* TO-DO ITEM (NOTE)             (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log(text);
    console.log();
  }

  printTaskUi(title, description, categoryName) {
    console.clear();
    console.log("********************************************");
    console.log("* TO-DO ITEM (TASK)             (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log(`TITLE: ${title}`);
    console.log(`CATEGORY: ${categoryName}`);
    console.log("DESCRIPTION");
    console.log(description);
    console.log();
  }

  show() {
    const listItem = this.state.grabListsItem(this.index);
    if (listItem !== undefined){
      if(listItem.type === "Note") {
        this.printNoteUi(listItem.text);
      } else {
        this.printTaskUi(listItem.title, listItem.text, this.state.grabCategory(listItem.categoryIndex));
      }

    console.log("Type \"C\" and hit \"Enter\" to complete this");
    console.log("task and return to the list screen. Just");
    console.log("hit \"Enter\" to return to the list screen.");
    this.rl.question("> ", answer => {
      if (answer === "C") {
        listItem.complete();
        this.state.saveInfo();
        // TODO: Save the application state

      }
      const screen = new ManageTasksScreen(this.rl, this.state);
      screen.show();
    });
  } else {
      const screen = new ManageTasksScreen(this.rl, this.state);
      screen.show();
      console.log('hey thats not valid! \n')
  }
  }
}

exports.ItemDetailScreen = ItemDetailScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { ManageTasksScreen } = require('./manage-task-screen');
