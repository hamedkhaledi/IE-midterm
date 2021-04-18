// last name saved
var saved_name = '';

/**
 * show error in page with red text
 *
 * @param {string} errorText Text Error .
 */
function showError(errorText) {
  document.getElementById(
    'probability'
  ).innerHTML = `<div class = 'error'>${errorText}</div>`;

  document.getElementById('gen_predict').innerHTML = '';
}

/**
 * send request and get gender, probability
 * call show error function if any error occurs
 * @param {string} name desired name .
 */
function sendRequest(name) {
  let url_add = 'https://api.genderize.io/?name=' + name;
  data = fetch(url_add)
    .then((response) => {
      if (!response.ok) {
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data['gender'] === undefined || data['gender'] === null)
        showError('This name does not support');
      else showPredict(data['gender'], data['probability']);
    })
    .catch((error) => {
      showError('connection error');
    });
}
/**
 * check if male radio button is selected
 *
 * @return {boolean}
 */
function checkMaleRadio() {
  maleRB = document.getElementById('male');
  if (maleRB.checked) {
    maleRB.checked = false;
    return true;
  }
  return false;
}
/**
 * check if Female radio button is selected
 *
 * @return {boolean}
 */
function checkFemaleRadio() {
  femaleRB = document.getElementById('female');
  if (femaleRB.checked) {
    femaleRB.checked = false;
    return true;
  }
  return false;
}
/**
 * get a gender and probability and show them
 * @param {string} gender.
 * @param {string} probability.
 */
function showPredict(gender, probability) {
  document.getElementById('gen_predict').innerHTML = gender;
  document = document.getElementById('probability').innerHTML = probability;
}

/**
 * empty saved part
 *
 */
function removeSavedContainer() {
  let myobj = document.getElementById('saved-container');
  if (myobj !== null) myobj.remove();
}

/**
 * this function create saved answer part based on a name that exists in local storage
 * @param {string} name desired name .
 */
function createSavedContainer(name) {
  gender = localStorage.getItem(name);
  let saved_container = document.getElementById('saved-container');
  if (saved_container !== null) {
    document.getElementById('saved_answer').innerHTML = gender;
  } else {
    let myobj = document.createElement('div');
    myobj.id = 'saved-container';
    myobj.className = 'answer-container';
    myobj.innerHTML = `
      <h2>Saved Answer</h2>
      <div id="saved_answer">${gender}</div>
      <br />
      <button onclick="clearButton(event);">Clear</button>`;
    document.getElementById('right-container').appendChild(myobj);
  }
}
/**
 * this function executed when submitButton pressed
 * and check if any radio buttons checked (then save in local storage if any of them checked)
 * after that send request to server and show answer
 *
 * @param {event} event for call prevent default .
 */
function submitButton(event) {
  event.preventDefault();

  var name = document.getElementById('input_name').value;

  if (checkMaleRadio()) {
    // Store
    localStorage.setItem(name, 'male');
    saved_name = name;
    sendRequest(name);
    createSavedContainer(name);
  } else if (checkFemaleRadio()) {
    // Store
    localStorage.setItem(name, 'female');
    saved_name = name;
    sendRequest(name);
    createSavedContainer(name);
  } else {
    saved_gender = localStorage.getItem(name);
    if (saved_gender == null) {
      sendRequest(name);
      removeSavedContainer();
    } else {
      saved_name = name;
      createSavedContainer(name);
      sendRequest(name);
    }
  }
}
/**
 * clear button handler
 * remove last saved name from localStorage
 * @param {event} event for call prevent default .
 */
function clearButton(event) {
  event.preventDefault();
  localStorage.removeItem(saved_name);
  document.getElementById('saved_answer').innerHTML = 'Cleared';
}
