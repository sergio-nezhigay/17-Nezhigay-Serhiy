import { users } from "./script.js";

class User {
  constructor(img, name, age, courses = []) {
    this.img = img;
    this.name = name;
    this.age = age;
    this.courses = courses;
  }
  render() {
    console.log("render: ", this.img, this.name, this.age);
    this.renderCourses();
  }
  renderCourses() {
    console.log("renderCourses", this.courses);
  }
}

class Student extends User {
  constructor(img, name, age, courses, role) {
    super(img, name, age, courses);
    this.role = role;
  }
}

class Lector extends User {
  constructor(img, name, age, courses, role) {
    super(img, name, age, courses);
    this.role = role;
  }
}

class Admin extends User {
  constructor(img, name, age, courses, role) {
    super(img, name, age, courses);
    this.role = role;
  }
}

const arrayOfObjects = [];

for (let i = 0; i < users.length; i++) {
  switch (users[i].role) {
    case "student":
      arrayOfObjects.push(
        new Student(
          users[i].img,
          users[i].name,
          users[i].age,
          users[i].courses,
          users[i].role
        )
      );
      break;
    case "lector":
      arrayOfObjects.push(
        new Lector(
          users[i].img,
          users[i].name,
          users[i].age,
          users[i].courses,
          users[i].role
        )
      );
      break;
    case "admin":
      arrayOfObjects.push(
        new Admin(
          users[i].img,
          users[i].name,
          users[i].age,
          users[i].courses,
          users[i].role
        )
      );

      break;
    default:
      console.log(
        `Error! Unknown User Type ${users[i].role} in user ${users[i]}`
      );
      break;
  }
}
console.log("🚀 ~ file: main.js:51 ~ arrayOfObjects:", arrayOfObjects);
arrayOfObjects.forEach((object) => {
  object.render();
});
