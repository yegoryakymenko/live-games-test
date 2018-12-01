// Сделать скрипт вариации для формы
// Поля:- 
// First name *- 
// Last name- 
// Password *- 
// Email *- 
// Textarea - 
// Country select box  *- 
// Checkbox *- 
// Submit button- 
// reset form
// По нажатию на  Submit происходит валидация. Обязательные поля должны быть не пустыми. 
// Поле пароля должно содержать буквы и цифры, если только буквы или цифры - ошибка.
// Email должен валидироваться регуляркой, checkbox должен быть выбран, кнопка reset обнуляет форму.
// У всех полей должен быть label. Можно использовать jquery, нельзя использовать какие-либо плагины для валидации форм. 
// Условие задания чтоб форму можно было легко менять - добавлять новые поля, не меняя js можно было указывать что поле обязательное или нет

let form = document.getElementById('myform');
form.addEventListener('submit', Validator);

function Validator(e) {
  let formEl       = document.getElementById(form.id);
  let formFields   = formEl.elements;
  console.log(formFields)
  let password = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
  let errors        = [];
  let rulesPattern = {
    email: /^([A-Za-z0-9_\-\.]{2,})+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
  }
  let rules = {
    required: function(el) {
      if(el.value != '') {
        showSuccess(el);
        return true;
      } else {
        showError(el);
        return false;
      }
    },
    checked: function(el) {
      if(el.checked) {
        showSuccessCheck(el);
        return true;
      } else {
        showErrorCheck(el);
        return false;
      }  
    },
    email: function(el) {
      return rulesPattern.email.test(el.value)
    },
    password: function(el) {
      return console.log(password.test(el.value)+ ' ' + el.value);
    }
  }
  let showError = function(el) {
      el.classList.remove('success');
      el.classList.add('error');
      el.nextElementSibling.innerHTML = el.dataset.error;
  }
  let showSuccess = function(el) {
    el.classList.remove('error');
    el.classList.add('success');
    el.nextElementSibling.innerHTML = '';
  }
  let showErrorCheck = function(el) {
    el.nextElementSibling.innerHTML = el.dataset.error;
  }
  let showSuccessCheck = function(el) {
    el.nextElementSibling.innerHTML = '';
  }
  let showErrors = function(arr) {
    console.log(arr);
  }
  for(let i = 0; i < formFields.length; i++) {
    if(formFields[i].tagName != 'TEXTAREA' && formFields[i].tagName != 'BUTTON'){
      let rulesList = formFields[i].dataset.rule;
      rulesList     = rulesList.split(' ');
      for(let j = 0; j < rulesList.length; j++) {
        if(rulesList[j] in rules) {
        if(!rules[rulesList[j]](formFields[i])) {
          errors.push({
            name: formFields[i].name,
            error: rulesList[j]
          })
        }
      }
      }
    }
  }
  if(errors.length > 0) {
    e.preventDefault();
    showErrors(errors);
  }
};