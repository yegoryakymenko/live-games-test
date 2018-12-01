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

let form  = document.getElementById('myform');
form.addEventListener('submit', Validator);

function Validator(e) {
  let reset        = document.querySelector('.reset');
  let formEl       = document.getElementById(form.id);
  let formFields   = formEl.elements;
  let errors       = [];
  let rulesPattern = {
    email: /^([A-Za-z0-9_\-\.]{2,})+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
    password : /(?=.*\d)(?=.*[A-Za-z])/g
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
      if(!rulesPattern.email.test(el.value)) {
        showError(el);
        return false;
      } else {
        showSuccess(el);
        return true;
      }
    },
    password: function(el) {
      if(!rulesPattern.password.test(el.value)) {
        showError(el);
        return false;
      } else {
        showSuccess(el);
        return true;
      }
    }
  }
  reset.addEventListener('click', function() {
    for(let z = 0; z < formFields.length; z++) {
      if(formFields[z].dataset.rule !== undefined) {
        showSuccess(formFields[z]);
      }
    }
  });
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

  for(let i = 0; i < formFields.length; i++) {
    if(formFields[i].dataset.rule !== undefined) {
      let rulesList = formFields[i].dataset.rule;
      rulesList     = rulesList.split(' ');
      for(let j = 0; j < rulesList.length; j++) {
        if(rulesList[j] in rules && !rules[rulesList[j]](formFields[i])) { 
          errors.push({
            name: formFields[i].name,
            error: rulesList[j]
          })
        }
      }
    }
  }
  if(errors.length > 0) {
    e.preventDefault();
  }
};