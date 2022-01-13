
export interface Query {
    name: string
}

export const tables = {
    user: {name: '"user".users'}
}

export const dbOps = {
    new: {name: 'INSERT INTO'}
}

export function qString(obj: Query) {
    return obj.name
}