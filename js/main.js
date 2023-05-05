import { users, gradation } from "./script.js";
const resultEl = document.querySelector(".users");

class User {
  constructor(img, name, age, courses = []) {
    this.img = img;
    this.name = name;
    this.age = age;
    this.courses = courses;
  }

  render() {
    let result = `
    <div class="user">    
      <div class="user__info">
        <div class="user__info--data">
            <img src="images/users/${this.img}.png" alt="${
      this.name
    }" height="50">
            <div class="user__naming">
                <p>Name: <b>${this.name}</b></p>
                <p>Age: <b>${this.age}</b></p>
            </div>
        </div>
        <div class="user__info--role ${this.role}">
            <img src="images/roles/${this.role}.png" alt="${
      this.role
    }" height="25">
            <p>${this.role}</p>
        </div>
      </div>
      ${this.renderCourses()}
    </div>`;
    return result;
  }

  renderCourses() {
    let result = `
    <div class="user__courses">
    ${this.courses
      .map(
        (course) => `
      <p class="user__courses--course ${this.role}">${
          course.title
        }<span class="${this.calculateGrade(
          course.mark
        )}">${this.calculateGrade(course.mark)}</span></p>`
      )
      .join("")}
      
    </div>`;
    return result;
  }
  calculateGrade(mark) {
    return Object.entries(gradation).reduce((acc, variant) => {
      if (mark >= variant[0]) return variant[1];
      else return acc;
    }, "");
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
  renderCourses() {
    let result = `
      <div class="user__courses admin--info">
    ${this.courses
      .map(
        (course) => `
        <div class="user__courses--course lector">
          <p>Title: <b>${course.title}</b></p>
          <p>Lector's score: <span class="${this.calculateGrade(
            course.score
          )}">${this.calculateGrade(course.score)}</span></p>
          <p>Average student's score: <span class="${this.calculateGrade(
            course.studentsScore
          )}">${this.calculateGrade(course.studentsScore)}</span></p>
        </div>
    `
      )
      .join("")}
    </div>`;
    return result;
  }
}

class Admin extends User {
  constructor(img, name, age, courses, role) {
    super(img, name, age, courses);
    this.role = role;
  }
  renderCourses() {
    let result = `
    <div class="user__courses admin--info">
    ${this.courses
      .map(
        (course) => `
        <div class="user__courses--course ${this.role}">
          <p>Title: <b>${course.title}</b></p>
          <p>Admin's score: <span class="${this.calculateGrade(
            course.score
          )}">${this.calculateGrade(course.score)}</span></p>
          <p>Lector: <b>${course.lector}</b></p>
        </div>
    `
      )
      .join("")}
      
    </div>`;
    return result;
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

arrayOfObjects.forEach((object) => {
  resultEl.insertAdjacentHTML("beforeend", object.render());
});
