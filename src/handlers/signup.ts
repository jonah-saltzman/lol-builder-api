import * as express from "express";
import User from "../db/models/User/user"
import { db } from '../index'

async function handleSignup(req: express.Request, res: express.Response) {
    console.log('in signup')
    console.log(req.body)
    const newUser = await User.createOne(req.body.password, req.body.email)
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