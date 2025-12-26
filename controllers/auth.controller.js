const {
    ErrorResDTO,
    CreateLoginDTO
} = require("../dtos/auth.dto");

const AuthService = require("../services/auth.service");

const AuthController = {
    create_login: async(req, res) => {
        try{
            const {
                email,
                password
            } = req.body

            const dto = CreateLoginDTO(email, password)
            
            const result = await AuthService.login(
                dto.email,
                dto.password,
                req
            )

            res.status(200).json(result)
        }   
        catch(err){
            return res.status(400).json(ErrorResDTO(err.message));
        }
    }
};

module.exports = AuthController;