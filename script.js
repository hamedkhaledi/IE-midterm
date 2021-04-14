var saved_name = '';

function showError(errorText) {
  console.log(errorText);
  document.getElementById(
    'saved_answer'
  ).innerHTML = `<div class = 'error'>${errorText}</div>`;
}

function sendRequest(name) {
  let url_add = 'https://api.genderize.io/?name=' + name;
  console.log(url_add);
  data = fetch(url_add)
    .then((response) => {
      if (!response.ok) {
        showError('connection error');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data['gender']);
      if (data['gender'] === undefined || data['gender'] === null)
        showError('This name does not support');
      else showPredict(data['gender'], data['probability']);
    })
    .catch((error) => {
      showPredict(data['gender'], data['probability']);
    });
}
function checkMaleRadio() {
  maleRB = document.getElementById('male');
  if (maleRB.checked) {
    maleRB.checked = false;
    return true;
  }
  return false;
}
function checkFemaleRadio() {
  femaleRB = document.getElementById('female');
  if (femaleRB.checked) {
    femaleRB.checked = false;
    return true;
  }
  return false;
}
function showPredict(gender, probability) {
  document.getElementById('gen_predict').innerHTML = gender;
  document = document.getElementById('probability').innerHTML = probability;
}
function emptyPredict(gender, probability) {
  document.getElementById('gen_predict').innerHTML = '';
  document = document.getElementById('probability').innerHTML = '';
  document.getElementById('saved_answer').innerHTML = '';
}
function submitButton(event) {
  event.preventDefault();

  var name = document.getElementById('input_name').value;

  if (checkMaleRadio()) {
    // Store
    localStorage.setItem(name, 'male');
    document.getElementById('input_name').value = '';
    emptyPredict();
  } else if (checkFemaleRadio()) {
    // Store
    localStorage.setItem(name, 'female');
    document.getElementById('input_name').value = '';
    emptyPredict();
  } else {
    // Retrieve
    saved_gender = localStorage.getItem(name);
    if (saved_gender == null) {
      sendRequest(name);
      document.getElementById('saved_answer').innerHTML = '';
    } else {
      saved_name = name;
      document.getElementById('saved_answer').innerHTML = saved_gender;
    }
  }
}

function clearButton(event) {
  event.preventDefault();
  localStorage.removeItem(saved_name);
  document.getElementById('saved_answer').innerHTML = 'Cleared';
}
