const LoginActivity = require("../../models/loginactivity.model");
const { getDistanceKm } = require("../geo/geo");

const evaluateRisk = async ({
    user,
    ip,
    location,
    currentHour
}) => {
    let score = 0;

    const history = await LoginActivity.find({ userId: user._id });

    // R1: New IP
    const knownIP = history.some(h => h.ip === ip);
    if (!knownIP) score += 20;

    // R2: Multiple failed attempts
    const failedAttempts = history.filter(
        h =>
            !h.success &&
            Date.now() - h.createdAt < 5 * 60 * 1000
    ).length;

    if (failedAttempts >= 3) score += 30;

    // R3: Unusual country
    const knownCountry = history.some(
        h => h.location?.country === location.country
    );
    if (!knownCountry) score += 40;

    // R4: Odd hour
    if (
        currentHour < user.usualLoginHours.start ||
        currentHour > user.usualLoginHours.end
    ) score += 10;

    // R6: Impossible travel
    const lastLogin = history.at(-1);
    if (lastLogin?.location) {
        const distance = getDistanceKm(
            lastLogin.location.lat,
            lastLogin.location.lng,
            location.lat,
            location.lng
        );

        const hours =
            (Date.now() - lastLogin.createdAt) / (1000 * 60 * 60);

        if (distance > 1000 && hours < 2) score += 50;
    }

    return score;
};

module.exports = evaluateRisk;
