const User = require("../models/user.model")
const LoginActivity = require("../models/loginactivity.model")

const getClientIP = require("../utils/other/getClientIP")
const getLocationFromIP = require("../utils/ip/ip")
const evaluateRisk = require("../utils/fraud/fraud")

const {
    CreateLoginResDTO
} = require("../dtos/auth.dto")

class AuthService {
    static async login(email, password, req) {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid login" });
        }

        const ip = getClientIP(req);
        const device = req.headers["user-agent"];
        const location = await getLocationFromIP(ip);

        const riskScore = await evaluateRisk({
            user,
            ip,
            location,
            currentHour: new Date().getHours()
        });

        await LoginActivity.create({
            userId: user._id,
            ip,
            device,
            location,
            success: true,
            riskScore
        });

        if (riskScore >= 50) {
            // return res.status(403).json({ action: "BLOCK_OR_OTP" });
            return CreateLoginResDTO("BLOCK_OR_OTP")
        }

        if (riskScore >= 31) {
            // return res.json({ action: "SECONDARY_VERIFICATION" });
            return CreateLoginResDTO("SECONDARY_VERIFICATION")

        }

        // return res.json({ action: "ALLOW_LOGIN" });
        return CreateLoginResDTO("ALLOW_LOGIN")

    }
}

module.exports = AuthService