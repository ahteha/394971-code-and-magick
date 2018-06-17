'use strict';

var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'gb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomItemFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards[i] = {
      name: getRandomItemFromArray(WIZARD_NAMES) + ' ' + getRandomItemFromArray(WIZARD_SURNAMES),
      coatColor: getRandomItemFromArray(COAT_COLORS),
      eyesColor: getRandomItemFromArray(EYES_COLORS)
    };
  }
  return wizards;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    fragment.appendChild(wizardElement);
  }
  return fragment;
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
similarListElement.appendChild(renderWizards(getRandomWizards(WIZARD_COUNT)));

var setup = document.querySelector('.setup');

setup.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupNameInput = setup.querySelector('.setup-user-name');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onInputEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    setupNameInput.blur();
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
  document.addEventListener('keydown', onPopupEscPress);
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
    document.addEventListener('keydown', onPopupEscPress);
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
  document.addEventListener('keydown', onInputEscPress);
});

setupNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
  document.removeEventListener('keydown', onInputEscPress);
});

var wizardSetup = setup.querySelector('.setup-player');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

var wizardCoatInput = setup.querySelector('input[name=coat-color]');
var wizardEyesInput = setup.querySelector('input[name=eyes-color]');
var wizardFireballInput = setup.querySelector('input[name=fireball-color]');

var changeColor = function (array, fill, value) {
  var color = getRandomItemFromArray(array);
  fill.style.fill = color;
  value.style.value = color;
};

wizardSetup.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('wizard-coat')) {
    changeColor(COAT_COLORS, wizardCoat, wizardCoatInput);
  } else if (target.classList.contains('wizard-eyes')) {
    changeColor(EYES_COLORS, wizardEyes, wizardEyesInput);
  } else if (target.parentNode.classList.contains('setup-fireball-wrap')) {
    var color = getRandomItemFromArray(FIREBALL_COLORS);
    wizardFireball.style.backgroundColor = color;
    wizardFireballInput.style.value = color;
  }
});
