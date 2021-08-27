df <- read.csv("r-csv/練習回数と連係入力慣れ分散分析.csv",header=T)
df
v1<-df[,colnames(df)=="X1回"]
v2<-df[,colnames(df)=="X2回"]
v3<-df[,colnames(df)=="X3回"]
v4<-df[,colnames(df)=="X4回"]
v5<-df[,colnames(df)=="X5回"]
v6<-df[,colnames(df)=="X6回"]
v7<-df[,colnames(df)=="X7回"]
v8<-df[,colnames(df)=="X8回"]
v9<-df[,colnames(df)=="X9回"]
v10<-df[,colnames(df)=="X10回"]
v11<-df[,colnames(df)=="X11回"]
v12<-df[,colnames(df)=="X12回"]
v13<-df[,colnames(df)=="X13回"]
v14<-df[,colnames(df)=="X14回"]
v15<-df[,colnames(df)=="X15回"]
v16<-df[,colnames(df)=="X16回"]
v17<-df[,colnames(df)=="X17回"]
v18<-df[,colnames(df)=="X18回"]
v19<-df[,colnames(df)=="X19回"]
v20<-df[,colnames(df)=="X20回"]

friedman.test(y=matrix(c(v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20),ncol=20))

df1 <- read.csv("r-csv/練習回数と連係入力慣れ多重比較.csv",header=T)
score<-df1[,colnames(df1)=="動画操作の慣れ"]
class<-df1[,colnames(df1)=="グループ"]
pairwise.t.test(score,class,p.adj="holm")
