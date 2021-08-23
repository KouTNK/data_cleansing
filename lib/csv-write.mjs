import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import iconv from 'iconv-lite'

function writeCSVFile(fileName, csv, encoding) {
    if (encoding === 'utf8') {
        fs.writeFile(fileName, csv, encoding, function (err) {
            if (err) {
                console.log('error')
            }
            else {
                console.log('success')
            }
        })
        return
    }
    if (encoding === 'Shift_JIS') {
        fs.writeFileSync(fileName, '');
        const fd = fs.openSync(fileName, 'w')
        const buf = iconv.encode(csv, encoding)
        fs.write(fd, buf, 0, buf.length, function (err, written, buffer) {
            if (err) {
                console.log('error')
            }
            else {
                console.log('success')
            }
        })
    }
}
//配列型を文字列型に変換
//[['a', 1, 'b'], ['c', 2, 'd'], ['e', 3, 'f']]
//↓↓↓
// a,1,b
// c,2,d
// e,3,f
function formatCSV(csv) {
    let result = ''
    for (let i = 0; i < csv.length; i++) {
        let row = csv[i]
        for (let j = 0; j < row.length; j++) {
            if (isRowEnd(j, row.length)) {
                if (isColmEnd(i, csv.length)) {
                    result = result + row[j]
                }
                else {
                    result = result + row[j] + '\r\n'
                }
            }
            else {
                result = result + row[j] + ','
            }
        }
    }
    return result
}
function isRowEnd(i, len) {
    const nextCell = i + 1
    return nextCell === len
}
function isColmEnd(i, len) {
    const nextColm = i + 1
    return nextColm === len
}
export { writeCSVFile, formatCSV }

function test() {
    const __dirname = dirname(fileURLToPath(import.meta.url)).replace("lib", "")
    const fileName = __dirname + '/write-files/sample.csv'

    const sampleArray = [['a', 1, 'b'], ['c', 2, 'd'], ['e', 3, 'f']]
    const csv = formatCSV(sampleArray)
    writeCSVFile(fileName, csv, 'utf8')
}
// test()
