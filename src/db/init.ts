import { Client } from 'pg'

class Postgres {
    public db
    private configuration = {
        host: process.env.POST_HOST,
        port: parseInt(process.env.POST_PORT, 10),
        user: process.env.POST_USER,
        database: process.env.POST_DB,
        password: process.env.POST_PASSWORD
    }
    private uri = process.env.POST_URI
    constructor() {
        this.db = new Client({connectionString: this.uri, ssl: {rejectUnauthorized: false}})
        console.log(this.uri)
    }

    /**
     * connect
     */
    public async connect() {
        await this.db.connect()
    }
    public async query(query: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.db.query(query)
                resolve(res)
            } catch (err) {
                reject(err)
            }
        })
    }
}

export default Postgres