// prepare datas
const studentDatas = [
  { name: "Joker", score: 80 },
  { name: "Lavenza", score: 90 },
  { name: "Igor", score: 100 },
];

const table = document.querySelector("tbody");
let num = 0;

// display datas
Object.values(studentDatas).forEach((student) => {
  const row = document.createElement("tr");
  const numTd = document.createElement("td");
  numTd.textContent = num += 1;
  const name = document.createElement("td");
  name.textContent = student.name;
  const score = document.createElement("td");
  score.textContent = student.score;
  const actionTd = document.createElement("td");
  const editStudent = document.createElement("a");
  editStudent.setAttribute("href", "edit-student.html");
  editStudent.textContent = "edit";
  const separator = document.createElement("p");
  separator.setAttribute("class", "d-inline-block");
  separator.textContent = " | ";
  const deleteStudent = document.createElement("a");
  deleteStudent.setAttribute("href", "delete-student.html");
  deleteStudent.textContent = "delete";
  actionTd.append(editStudent, separator, deleteStudent);
  row.append(numTd, name, score, actionTd);
  table.appendChild(row);
});
