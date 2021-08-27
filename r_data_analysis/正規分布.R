df <- read.csv("r-csv/finish-time.csv",header=T)
df
row1<-df[,colnames(df)=="第1回"]
row2<-df[,colnames(df)=="第2回"]
row3<-df[,colnames(df)=="第3回"]
row4<-df[,colnames(df)=="第4回"]
row5<-df[,colnames(df)=="第5回"]
shapiro.test(x=row1)
shapiro.test(x=row2)
shapiro.test(x=row3)
shapiro.test(x=row4)
shapiro.test(x=row5)

oneway.test(df)
