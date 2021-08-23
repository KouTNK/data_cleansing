import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { getCSVFile, cellNameIndex } from '../lib/csv-sync.mjs'
import { writeCSVFile, formatCSV } from '../lib/csv-write.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url)).replace("test", "")
const readFile = __dirname + '/read-files/第5回手話文字通訳実験（ソート）.csv'
const csv = getCSVFile(readFile)

const index = {
    taskID: cellNameIndex(csv, 'taskID'),
    startTime: cellNameIndex(csv, 'startTime'),
    finishTime: cellNameIndex(csv, 'finishTime')
}

const CSVForTaskTime = createCSVForTaskTime(csv, index)
const writeFile = __dirname + 'write-files/第5回手話文字通訳実験（通訳区間の時間）.csv'
const encoding = {
    utf8: 'utf8',
    Shift_JIS: 'Shift_JIS'
}
writeCSVFile(writeFile, formatCSV(CSVForTaskTime), encoding.Shift_JIS)

function createCSVForTaskTime(csv, index) {
    let isStart = 0
    let startTime
    const result = []
    for (let i = 1; i < csv.length; i++) {
        if (!isStart) {
            startTime = csv[i][index.startTime]
            isStart = startToSearchFinishTime()
        }
        else {
            if (isClosedLoop(i)) {
                const finishTime = csv[i][index.finishTime]
                const CSVData = createArrayForCSVData(csv[i][index.taskID], startTime, finishTime)
                result.push(CSVData)
                return result
            }
            else if (isFinishTime(csv[i][index.taskID], csv[i + 1][index.taskID])) {
                const finishTime = csv[i][index.finishTime]
                const CSVData = createArrayForCSVData(csv[i][index.taskID], startTime, finishTime)
                result.push(CSVData)
                isStart = searchStartTime()
            }
        }
    }
}

function searchStartTime() {
    return 0
}
function startToSearchFinishTime() {
    return 1
}
function createArrayForCSVData(taskID, startTime, finishTime) {
    const result = [taskID, startTime,finishTime]
    return result
}
function isClosedLoop(i) {
    return !csv[i + 1]
}
function isFinishTime(taskID, nextTaskID) {
    return taskID !== nextTaskID
}

export { createCSVForTaskTime }