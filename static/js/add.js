console.log('connected');
const addBtn = document.querySelector('#addHobbyButton');
const hobbyInput = document.querySelector('#addHobbyInput');
const hobbiesList = document.querySelector('section.hobbies ul');
console.log(addBtn);

addBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const newHobby = hobbyInput.value;
  console.log(newHobby);
  createNewhobby(newHobby);
  hobbyInput.value = '';
});

let checkboxIndex = 5;

function createNewhobby(hobby) {
  const item = document.createElement('li');

  //create checkbox
  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', 'hobbies');
  input.setAttribute('id', 'checkbox' + checkboxIndex);
  input.setAttribute('value', hobby);
  input.setAttribute('checked', 'true');

  //create checkbox label for styling
  const label = document.createElement('label');
  label.setAttribute('for', 'checkbox' + checkboxIndex);
  label.innerText = hobby;

  //constructing list item
  item.appendChild(input);
  item.appendChild(label);

  // append item to unordered list
  hobbiesList.appendChild(item);

  console.log(item);
  checkboxIndex++;
}
