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

    const isSubmit = (isStart, key) => isStart && key === 'Enter'
    const calcCaptionTime = (startTime, finishTime) => (finishTime - startTime) / 1000
    const createArrayForCSVData = (id, captionTime, taskID, value) => [id, captionTime, taskID, value]
    const isClosedLoop = (i) => !csv[i + 1]
    const reCalc = () => 0
    const startToSearchSubmitKey = () => 1
    const isCalcStart = (taskID, nextTaskID) => taskID !== nextTaskID

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
                isStart = reCalc()
            }
        }
    }
}

export { createCSVForCaptionTime }
