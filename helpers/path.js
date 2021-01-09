const path = require("path");
module.exports = path.dirname(process.mainModule.filename);
module.exports = function getRandomNumber(min, max) {
    return Math.floor(  Math.random() * (max - min + 1) + min );
};