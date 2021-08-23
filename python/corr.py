# 手話文字通訳システムのログデータのいらないデータを省く処理の自動化

import numpy as np
import pandas as pd
# csv読み込み
file = pd.read_csv('readFiles/ex_ishikawa_smart_result.csv')
# dataframe変換（データをいじれるようにするため）
df = pd.DataFrame(file)
corr = df.corr()
# print(df.mean())
name = None
count = 0
total = 0
for i in range(len(df)):
    if name is None:
        name = df['name'][i]
    if name == df['name'][i]:
        total += df['captionTime'][i]
        count += 1
    else:
        print(name,total/count)
        name = df['name'][i]
        total = df['captionTime'][i]
        count = 1
print(name,total/count)
# csv書き込み
# corr.to_csv('writeFiles/ex_ishikawa_smart_corr.csv')
