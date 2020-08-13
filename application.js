// This is the State class that should manage the
// entire state of your application.
const fs = require("fs");
class State {
  // Called from program.js to create an instance
  // of the application state.
  constructor(filePath) {
    this.filePath = filePath;
    this.categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"]
    this.lists = []
    // TODO: Any other initialization that you need.
  }
  grabCategoryLength() {
    return this.categories.length
  }

  grabCategory(index) {
    return this.categories[index];
  }

  setCategory(index, input) {
    this.categories[index] = input
  }

  addNote(text) {
    this.lists.push(new Note(text, false));
  }

  addTask(title, text, categoryIndex) {
    this.lists.push(new Task(title, text, categoryIndex, false));
  }

  grabListsLength() {
    return this.lists.length;
  }

  grabListsItem(index) {
    return this.lists[index];
  }

  grabListsHeader(index) {
    return this.lists[index].returnString();
  }

  grabListsType(index) {
    return this.lists[index].type;
  }

  searchText(index, term) {
    return this.lists[index].searchItem(term);
  }
  // Called from program.js if there is JSON saved
  // in the file pointed to by the value in
  // this.filePath.
  loadFromJson(data) {
    const {
      categories,
      lists
    } = JSON.parse(data)

    // for (const i of categories) {
    //   this.categories = i;
    // }

    for (let i = 0; i < categories.length; i += 1) {
      this.categories[i] = categories[i];
    }

    for (let i = 0; i < lists.length; i += 1) {
      const listData = lists[i];
      let list = null;
      if (listData.type === 'Note') {
        list = new Note(listData.text, listData.completed);
      } else if (listData.type === 'Task') {
        const {
          title,
          text,
          categoryId,
          completed,
        } = listData;
        list = new Task(title, text, categoryId, completed);
      }
      this.lists.push(list);
    }
  }

  saveInfo() {
    const info = {
      lists: this.lists,
      categories: this.categories,
    }
    fs.writeFile(this.filePath, JSON.stringify(info), err => {});

  }

  // TODO: Your code, here, to manage the state
}

// TODO: All of your other classes, here.
class Note {
  constructor(text, completed) {
    this.type = "Note",
      this.text = text,
      this.completed = completed
  }

  complete() {
    this.completed = true;
  }

  returnString() {
    return this.text;
  }

  searchItem(term) {
    return this.text.includes(term);
  }
}

class Task {
  constructor(title, text, categoryIndex, completed) {
    this.type = "Task",
      this.title = title,
      this.text = text,
      this.categoryIndex = categoryIndex,
      this.completed = completed;
  }

  complete() {
    this.completed = true;
  }

  returnString() {
    return this.title;
  }

  searchItem(term) {
    return (this.title.includes(term) || this.text.includes(term))
  }
}


// TODO: Export your classes, here, if necessary.
module.exports = {
  State
};
