const fs = require('fs')
const { join } = require('path')
const { Server } = require('http')
 
const filePath = join(__dirname, 'users.json')

const getUsers = () => {
    const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : []


    try{
        return JSON.parce(data)
    }catch (error) {
        return []
    }
}

const saveUser = users => fs.writeFileSync(filePath, JSON.stringify(users, null, '/t'))

const userRoute = (app) => {
    app.route('/users/:id?')
    .get((req,res) => {
        const users = getUsers()
        
        res.send({ users })
    })
    .post((req, res) => {
        const users = getUsers()

        users.push(req.body)
        saveUser(users)

        res.status(201).send('Ok!')
    })
    .put((req, res) => {
        const users = getUsers()

        saveUser(users.map(user => {
            if (user.id ===res.params.id ) {
                return {
                    ...user,
                    ...req.body
                }
            }
            return user
        }))
        res.status(200).send('Ok!')
    })

}

module.exports = userRoute