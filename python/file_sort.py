# -*- coding: utf-8 -*-
# 手話文字通訳システムのログデータのいらないデータを省く処理の自動化
# import openapi_codec as codecs
import numpy as np
import pandas as pd
# csv読み込み
# with codecs.open("readFiles/第1回手話文字通訳実験.csv", "r", "Shift-JIS", "ignore") as file:
#     df = pd.read_table(file, delimiter=",")
file = pd.read_csv('readFiles/第1回手話文字通訳実験.csv', encoding="shift-jis")
# dataframe変換（データをいじれるようにするため）
df = pd.DataFrame(file)
df = df.sort_values(['taskID', 'timeStamp'])
# csv書き込み
df.to_csv('writeFiles/第1回手話文字通訳実験（整理後）.csv')
