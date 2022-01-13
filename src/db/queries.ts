import { qString, Query } from './strings'

function queryConstructor(table: Query, op: Query, values: object) {
    const o = qString(op)
	const t = qString(table)
	const vArr = []
    const kArr = []
    for (const [key, value] of Object.entries(values)) {
        if (value !== null) {
            const s = value.toString()
			vArr.push(`'${s}'`)
            kArr.push(key)
        }
    }
    const k = '(' + kArr.join(', ') + ')'
    const v = 'VALUES (' + vArr.join(', ') + ')'
    const str = [o, t, k, v].join(' ')
    console.log('-----QUERY STRING-----')
    console.log(str)
    return str
}

export default queryConstructor