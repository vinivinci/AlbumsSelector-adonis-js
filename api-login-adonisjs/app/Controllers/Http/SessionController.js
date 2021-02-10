'use strict'
const User = use("App/Models/User")
class SessionController {
    async create({ request, auth }) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password)

        return token
    }
    async Loggout({ auth, params, response }) {
        try {
            const user = await User.find(params.id)
            await auth
                .authenticator('jwt')
                .revokeTokensForUser(user)
            return response.status(200);
        } catch (err) {
            console.log(err);
            return response.status(400);
        }

    }
}

module.exports = SessionController
