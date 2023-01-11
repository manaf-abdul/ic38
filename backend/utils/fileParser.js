import xlsx from 'node-xlsx'

export const fileParser = (e) => {

    const data = xlsx.parse(e, { type: "buffer", blankrows: false })

    const dataObject = data.map((d) => {
        const head = d.data.shift()

        d.data = d.data.map((d) => {
            const dObj = {}

            for (let idx in head) {
                dObj[head[idx]] = d[idx] || null
            }
            return dObj
        })

        return d
    })
    return dataObject
}