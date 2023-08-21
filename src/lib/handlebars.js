const timeago = require('timeago.js');
const timeagoInstance = timeago();

const helpers = {};

helpers.timeago = (savedTimestamp) => {
    return timeagoInstance.format(savedTimestamp);
};

helpers.ifUsername =  function(user, options) {
    if (user.username === 'karen.jasso@sems.gob.mx') {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }

module.exports = helpers;