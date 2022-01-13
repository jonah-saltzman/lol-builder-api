import { tables, dbOps as ops } from '../strings'
import newQuery from '../queries'
import { db } from '../../index'

import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

interface UserData {
	db: typeof db

	data: {
		userId: string

		email?: string

		password?: string

		tokens: string[]

		invalidTokens: string[]

		created: Date

		modified: Date
	}
}

class User implements UserData {
	constructor(connection: typeof db, pass: string, email?: string) {
		this.data = {
			userId: v4(),
			password: bcrypt.hashSync(pass, 10),
			created: new Date(),
			modified: new Date(),
			tokens: [],
			invalidTokens: [],
			email: email ? email : null,
		}
        this.exists = false
		this.db = connection
	}

	static async createOne(pass: string, email?: string) {
		const newUser = new this(db, pass, email)
		console.log('creating user:')
		console.log(newUser.data)
		if (await newUser.create()) {
			console.log('created!')
			return newUser
		} else {
			return null
		}
	}

	db: typeof db

	private exists: boolean

	data: {
		userId: string

		email?: string

		password?: string

		tokens: string[]

		invalidTokens: string[]

		created: Date

		modified: Date
	}

	async checkPassword(pass: string) {
		return await bcrypt.compare(pass, this.data.password)
	}

    created() {
        return this.exists
    }

	private async create() {
		const query = newQuery(tables.user, ops.new, this.marshal())
		const response = await this.db.query(query)
        if (response.rowCount === 1) {
            this.exists = true
            return true
        }
        this.exists = false
		return false
	}

	public marshal() {
		const pgData = {
			userId: this.data.userId,
			email: this.data.email ? this.data.email : null,
			password: this.data.password ? this.data.password : null,
			tokens: this.data.tokens.length > 0 ? this.data.tokens : null,
			invalidTokens:
				this.data.invalidTokens.length > 0 ? this.data.invalidTokens : null,
			created: this.data.created.toISOString(),
			modified: this.data.modified.toISOString(),
		}
		return pgData
	}
}

export default User