const dotenv = require('dotenv');
dotenv.config();
module.exports.KEYS = {
    GEO_USER: process.env.GEO_USER,
    WB_KEY: process.env.WB_KEY,
    PB_Key: process.env.PB_KEY,
};

let plannerData = {
}

module.exports = plannerData