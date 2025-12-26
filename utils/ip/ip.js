const axios = require("axios");

const getLocationFromIP = async (ip) => {
    const res = await axios.get(`https://ipapi.co/72.14.201.168/json/`);

    return {
        country: res.data.country_name,
        city: res.data.city,
        lat: res.data.latitude,
        lng: res.data.longitude
    };
};

module.exports = getLocationFromIP;
