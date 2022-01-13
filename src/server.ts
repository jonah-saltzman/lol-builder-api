import express, { Application, Router } from 'express'
import bodyParser from 'body-parser'
import db from './db/init'
import signup from './handlers/signup'

class Server {
	private app
    public db
	constructor() {
		this.app = express()
		this.config()
        this.db = new db()
        this.dbConnect()
        this.addRoutes()
	}

	private config() {
		this.app.use(bodyParser.json())
	}
	private dbConnect() {
		this.db.connect()
	}
    private addRoutes() {
        this.app.get('/', (req, res) => {
            res.send('You are connected')
        })
        this.app.post('/signup', signup)
    }
    public start(port: number) {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                console.log(`listening on port ${port}`)
                resolve(port)
            })
                .on('error', (err: object) => reject(err))
        })
    }
}

export default Server