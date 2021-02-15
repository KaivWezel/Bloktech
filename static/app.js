const hobbies = ["reizen", "koken", "sporten", "gamen", "knutselen"];
const list = document.querySelector(".hobbies");

hobbies.forEach(function (hobby) {
  const newListItem = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", hobby);
  label.setAttribute("for", hobby);
  list.appendChild(newListItem);
  newListItem.appendChild(checkbox);
  newListItem.appendChild(label);
  label.innerText = hobby;
});
