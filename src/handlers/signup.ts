import * as express from "express";
import User, { UserInfo } from "../db/models/User/user"


async function handleSignup(req: express.Request, res: express.Response) {
    console.log('in signup')
    console.log(req.body)
    const newObj: UserInfo = {
			password: req.body.password,
			email: req.body.email,
            modified: new Date().getTime(),
            created: new Date().getTime()
		}
    const newUser = await User.createOne(newObj)
    if (newUser) {
        console.log('CREATED!')
        console.log(newUser.created())
        res.status(201).end()
        return
    } else {
        console.log('Failed...')
        res.status(500).end()
        return
    }
}

export default handleSignup