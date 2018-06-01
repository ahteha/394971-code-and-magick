var fireballSize = 22;
var getFireballSpeed = function (left) {
  return left ? 5 : 2;
};
var wizardSpeed = 3;
var wizardWidth = 70;
var getWizardHeight = function (wizardWidth) {
  wizardHeight = 1.337 * wizardWidth;
  return wizardHeight;
};
var getWizardX = function (width) {
  var wizardX = (width - wizardWidth) / 2;
  return wizardX;
};
var getWizardY = function (height) {
  var wizardY = (height - wizardHeight) / 3;
  return wizardY;
};
