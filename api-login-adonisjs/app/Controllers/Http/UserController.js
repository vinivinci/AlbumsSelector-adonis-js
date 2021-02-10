'use strict'
const User = use("App/Models/User")

class UserController {
    async create({ response, request }) {
        try {
            const data = request.only(["email", "password"])
            const user = await User.create(data)
            return response.status(200).send(user);
        }catch(err){
            console.log(err)
            return response.status(400)
        }
  }
}

module.exports = UserController
