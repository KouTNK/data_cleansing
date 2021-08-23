import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { getCSVFile, cellNameIndex } from '../lib/csv-sync.mjs'
import { writeCSVFile, formatCSV } from '../lib/csv-write.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url)).replace("test", "")
const readFile = __dirname + '/read-files/第5回手話文字通訳実験（ソート）.csv'
const csv = getCSVFile(readFile)

const index = {
    id: cellNameIndex(csv, 'id'),
    timeStamp: cellNameIndex(csv, 'timeStamp'),
    taskID: cellNameIndex(csv, 'taskID'),
    key: cellNameIndex(csv, 'key'),
    value: cellNameIndex(csv, 'value')
}

const CSVForCaptionTime = createCSVForCaptionTime(csv, index)
const writeFile = __dirname + 'write-files/第5回手話文字通訳実験（通訳時間）.csv'
const encoding = {
    utf8: 'utf8',
    Shift_JIS: 'Shift_JIS'
}
writeCSVFile(writeFile, formatCSV(CSVForCaptionTime), encoding.Shift_JIS)

function createCSVForCaptionTime(csv, index) {
    let isStart = 0
    let startTimeStamp
    const result = []
    for (let i = 1; i < csv.length; i++) {
        if (!isStart) {
            startTimeStamp = csv[i][index.timeStamp]
            isStart = startToSearchSubmitKey()
        }
        else if (isSubmit(isStart, csv[i][index.key])) {
            if (isClosedLoop(i)) {
                const finishTimeStamp = csv[i][index.timeStamp]
                const captionTime = calcCaptionTime(startTimeStamp, finishTimeStamp)
                const CSVData = createArrayForCSVData(csv[i][index.id], captionTime, csv[i][index.taskID], csv[i][index.value])
                result.push(CSVData)
                return result
            }
            else if (isCalcStart(csv[i][index.taskID], csv[i + 1][index.taskID])) {
                const finishTimeStamp = csv[i][index.timeStamp]
                const captionTime = calcCaptionTime(startTimeStamp, finishTimeStamp)
                const CSVData = createArrayForCSVData(csv[i][index.id], captionTime, csv[i][index.taskID], csv[i][index.value])
                result.push(CSVData)
                isStart = recalc()
            }
        }
    }
}
function recalc() {
    return 0
}
function startToSearchSubmitKey() {
    return 1
}
function calcCaptionTime(startTime, finishTime) {
    const result = (finishTime - startTime) / 1000
    return result
}
function createArrayForCSVData(id, captionTime, taskID, value) {
    const result = [id, captionTime, taskID, value]
    return result
}
function isClosedLoop(i) {
    return !csv[i + 1]
}
function isCalcStart(taskID, nextTaskID) {
    return taskID !== nextTaskID
}
function isSubmit(isStart, key) {
    return isStart && key === 'Enter'
}

export { createCSVForCaptionTime }
