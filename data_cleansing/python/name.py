# -*- coding: utf-8 -*-
# 手話文字通訳システムのログデータのいらないデータを省く処理の自動化
# import chardet
import numpy as np
import pandas as pd
# csv読み込み
# file = pd.read_csv('readFiles/第1回手話文字通訳実験（整理後）.csv',encoding="utf-8")
file = pd.read_csv('readFiles/第1回手話文字通訳実験（整理後）.csv',encoding="utf-8")
# dataframe変換（データをいじれるようにするため）
df = pd.DataFrame(file)

data = {
    'name': None,
    'taskID': None,
    'numberOfTime': None,
    'captionTime': None
}
array = None
taskID = 0
searchFinishTask = False
captionStartTime = None
for i in range(len(df)):
    print(df['timeStamp'][i])
    if df['taskID'][i] == taskID and searchFinishTask == False:
        searchFinishTask = True
        captionStartTime = df['timeStamp'][i]
    elif df['taskID'][i+1] != taskID and searchFinishTask == True:
        searchFinishTask = False
        taskID = df['taskID'][i+1]
        data['name'] = df['id'][i]
        data['taskID'] = df['taskID'][i]
        data['numberOfTime'] = df['numberOfTime'][i]
        captionFinishTime = df['timeStamp'][i]
        data['captionTime'] = (captionFinishTime-captionStartTime)/1000
        # print(data['captionTime'])
        if array is None:
            array = np.array(
                [[data['name'], data['taskID'], data['numberOfTime'], data['captionTime']]])
        else:
            result = np.array(
                [[data['name'], data['taskID'], data['numberOfTime'], data['captionTime']]])
            array = np.append(array, result, axis=0)
    if taskID == 99:
        break

result = np.array(array)
result = pd.DataFrame(
    result, columns=['name', 'taskID', 'numberOfTime', 'captionTime'])

# csv書き込み
result.to_csv('writeFiles/第1回手話文字通訳実験（通訳時間）.csv', index=False)
