import { tables, dbOps as ops } from '../../strings'
import newQuery from './queries'
import { db } from '../../../index'

import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

export interface UserInfo {
    userId?: string

    email?: string

    password?: string

    tokens?: string[]

    invalidTokens?: string[]

    created?: number

    modified: number
}

class User {
	constructor(connection: typeof db, init: UserInfo) {
		this.data = {
			userId: v4(),
			password: bcrypt.hashSync(init.password, 10),
			created: new Date().getTime(),
			modified: new Date().getTime(),
			tokens: [],
			invalidTokens: [],
			email: init.email ? init.email : null,
		}
        this.exists = false
		this.db = connection
	}

	static async createOne(init: UserInfo): Promise<User> {
		const newUser = new this(db, init)
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

		created: number

		modified: number
	}

	async checkPassword(pass: string): Promise<boolean> {
		return await bcrypt.compare(pass, this.data.password)
	}

    created(): boolean {
        return this.exists
    }

	private async create(): Promise<boolean> {
		const query = newQuery(tables.user, ops.new, this.marshal())
		const response = await this.db.query(query)
        if (response.rowCount === 1) {
            this.exists = true
            return true
        }
        this.exists = false
		return false
	}

	public marshal(): UserInfo {
		const pgData = {
			userId: this.data.userId,
			email: this.data.email ? this.data.email : null,
			password: this.data.password ? this.data.password : null,
			tokens: this.data.tokens.length > 0 ? this.data.tokens : null,
			invalidTokens:
				this.data.invalidTokens.length > 0 ? this.data.invalidTokens : null,
			created: this.data.created,
			modified: this.data.modified,
		}
		return pgData
	}
}

export default User