# 手話文字通訳システムのログデータのいらないデータを省く処理の自動化

import numpy as np
import pandas as pd

# 再生を停止と表示するようなミスはここで修正


def revision(df):
    operationName = {
        'play': '再生',
        'pause': '停止'
    }
    for i in range(len(df)):
        if df['operationName'][i] == '再生':
            df['operationName'][i] = operationName['pause']
        elif df['operationName'][i] == '停止':
            df['operationName'][i] = operationName['play']
    return df

# 通訳スタート前のデータを消す


def getDeleteUntilStartDataFrameAndCount(df):
    for i in range(len(df)):
        if df['operationName'][i] == '開始':
            return df, i
        else:
            df = df.drop(i)

# 通訳終了後以降、いらないIDを取得（idが50なら50以上のIDはいらない）


def getEndId(df, count):
    for i in range(len(df)):
        id = i + count
        if not pd.isnull(df['split'][id]):
            if float(df['split'][id]) - float(df['start'][id]) < 0.001:
                return df['taskId'][id]

# getEndId()で取得したIdをここに入れると終了後以降のデータをすべて消してくれる


def getDeleteAfterEndDataFrame(df, count, endId):
    for i in range(len(df)):
        id = i + count
        if df['taskId'][id] >= endId:
            df = df.drop(id)
    return df


# csv読み込み
file = pd.read_csv('readFiles/ex_ishikawa_smart.csv')
# dataframe変換（データをいじれるようにするため）
df = pd.DataFrame(file)
# 再生と停止を入れ替える修正
df = revision(df)
# スタート前のデータを削除（削除しても15から始まるデータは15からとなり、0になるわけでないのでcountで引く必要）
df, count = getDeleteUntilStartDataFrameAndCount(df)
# 通訳終了後以降のID取得
# endId = getEndId(df, count)
# 通訳終了後のデータを削除
# df = getDeleteAfterEndDataFrame(df, count, endId)
# csv書き込み
df.to_csv('writeFiles/ex_ishikawa_smart.csv')
