import express from 'express'
import dotenv from 'dotenv'
import Server from './server'
import crud from 'postgres-queries'
dotenv.config()
const port = parseInt(process.env.PORT, 10) // default port to listen

// const userQuery = crud.crud({
//     table: 'users',
//     primaryKey: 'user_id',
//     writeableCols: ['user_id', 'email', 'password', 'tokens', 'invalid_tokens', 'created', 'modified']
// })

const server = new Server()
server.start(port).then(async () => {
    const result = await server.db.query('SELECT * FROM "user".users')
    console.log(result)
})