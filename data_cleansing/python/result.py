# 手話文字通訳システムのログデータのいらないデータを省く処理の自動化

import numpy as np
import pandas as pd
# csv読み込み
file = pd.read_csv('readFiles/予備実験3回目（整理後）.csv')
# dataframe変換（データをいじれるようにするため）
df = pd.DataFrame(file)
# print(df.head(0))
# df = pd.DataFrame([
#   ["0001", "John", "Engineer"],
#   ["0002", "Lily", "Sales"]],
#   columns=['id', 'name', 'job'])
max = 0
for i in range(len(df)):
    if max < df['taskId'][i]:
        max = df['taskId'][i]
result = np.array([['name', 'taskId', 'play', 'captionTime',
                    'value', 'pause', 'seekBack', 'rate']])
data = {
    'name': None,
    'taskId': None,
    'play': None,
    'captionTime': None,
    'value': None,
    'pause': None,
    'seekBack': None,
    'rate': None
}
flag = False
array = None
for i in range(len(df)):
    if df['operationName'][i] == '開始' and df['taskId'][i] < 49:
        flag = True
        data['pause'] = 0
        data['seekBack'] = 0
        captionStartTime = df['captionTimeStamp'][i]
        # if data['name'] == None:
        #     data['name'] = df['name'][i]
        # if df['name'][i] != data['name']:
        #     data['name'] = df['name'][i]
    elif df['operationName'][i] == '送信' and df['taskId'][i] < 49:
        flag = False
        data['name'] = df['name'][i]
        data['taskId'] = df['taskId'][i]+1
        data['play'] = df['play'][i]+1
        captionEndTime = df['captionTimeStamp'][i]
        data['captionTime'] = (captionEndTime - captionStartTime)/1000
        data['value'] = df['value'][i]
        data['rate'] = df['rate'][i]
        if array is None:
            array = np.array([[data['name'], data['taskId'], data['play'], data['captionTime'],
                               data['value'], data['pause'], data['seekBack'], data['rate']]])
        else:
            result = np.array([[data['name'], data['taskId'], data['play'], data['captionTime'],
                                data['value'], data['pause'], data['seekBack'], data['rate']]])
            array = np.append(array, result, axis=0)
    if flag and df['operationName'][i] == '停止':
        if not pd.isnull(df['split'][i]):
            if df['split'][i]-df['captionTimeStamp'][i] > 0.1:
                data['pause'] += 1
        else:
            data['pause'] += 1
    elif flag and df['operationName'][i] == '１秒戻る':
        data['seekBack'] += 1
    elif flag and i != 0:
        if flag and df['capitonCurrentTime'][i-1]-df['capitonCurrentTime'][i] > 1.2:
            data['seekBack'] += 1
    # 再生と停止を入れ替える修正
result = np.array(array)
result = pd.DataFrame(result, columns=['name', 'taskId', 'play', 'captionTime',
                                       'value', 'pause', 'seekBack', 'rate'])
# print(mean['play'])
# corr = df.corr()
# print(corr)

# csv書き込み
result.to_csv('writeFiles/ex_ishikawa_pc_result.csv',index=False)
