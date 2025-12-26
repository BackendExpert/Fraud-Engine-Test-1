exports.CreateLoginDTO = (email, password) => ({email, password})

exports.CreateLoginResDTO = (message) => ({ success: true, message })

exports.ErrorResDTO = (message = "Something went wrong") => ({ success: false, message })
