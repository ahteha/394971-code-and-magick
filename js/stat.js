'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_SIZE = 16;
var TITLE_GAP = 25;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var MAX_BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, color, size, message) {
  ctx.fillStyle = color;
  ctx.font = size + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(message, x, y);
};

var getRandomSaturation = function (min, max) {
  return Math.floor((Math.random() * max) + min);
};

var getMaxElement = function (array) {
  var maxElement = array[0];
  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, CLOUD_X + TITLE_GAP, CLOUD_Y + TITLE_GAP, '#000', FONT_SIZE, 'Ура вы победили!');
  renderText(ctx, CLOUD_X + TITLE_GAP, CLOUD_Y + TITLE_GAP + FONT_SIZE, '#000', FONT_SIZE, 'Список результатов:');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderText(ctx, CLOUD_X + TITLE_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP, '#000', FONT_SIZE, names[i]);

    var columnColor = 'hsl(240, ' + getRandomSaturation(10, 100) + '%, 60%)';
    if (names[i] === 'Вы') {
      columnColor = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillStyle = columnColor;
    var barHeight = -(MAX_BAR_HEIGHT * times[i]) / maxTime;
    ctx.fillRect(CLOUD_X + TITLE_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_SIZE - GAP, BAR_WIDTH, barHeight);

    renderText(ctx, CLOUD_X + TITLE_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - (barHeight * -1) - BAR_GAP, '#000', FONT_SIZE, Math.round(times[i]));
  }
};
