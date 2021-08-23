import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import csvSync from 'csv-parse/lib/sync.js'
import iconv from 'iconv-lite'

function getCSVFile(filePath) {
    const file = fs.readFileSync(filePath)
    const buf = new Buffer.from(file, 'binary')//文字化け対策
    const retStr = iconv.decode(buf, 'Shift_JIS')//文字化け対策
    const result = csvSync(retStr)
    return result
}
function cellNameIndex(csv, cellName) {
    for (let i = 0; i < csv[0].length; i++) {
        if (csv[0][i] === cellName) {
            return i
        }
    }
    return console.log('no callName')
}
function readColData(csvData) {
    for (let data of csvData) {
        console.log(data)
    }
}
export { getCSVFile, cellNameIndex }

function test() {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const filePath = __dirname + '/read-files/sample.csv'
    const readData = getCSVFile(filePath)
    console.log(readData[0], readData[1])
    // console.log(readColData(readData))
}
// test()