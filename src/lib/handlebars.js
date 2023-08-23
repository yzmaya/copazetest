const timeago = require('timeago.js');
const timeagoInstance = timeago();

const helpers = {};

helpers.timeago = (savedTimestamp) => {
    return timeagoInstance.format(savedTimestamp);
};

helpers.eq = function (v1, v2) {
  return v1 === v2;
};

module.exports = helpers;