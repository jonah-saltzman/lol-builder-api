import database from '../init'

class DbObject {
    private db: typeof database

    constructor(db: typeof database) {
        this.db = db
    }
}

export default DbObject