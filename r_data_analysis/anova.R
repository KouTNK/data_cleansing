df <- read.csv("r-csv/通訳時間分散分析.csv",header=T)
df
row1<-df[,colnames(df)=="通訳時間"]
row2<-df[,colnames(df)=="グループ"]

oneway.test(row1~row2,var.equal=T)
install.packages("lawstat",repos="http://cran.ism.ac.jp/")
library(lawstat)
levene.test(y=row1,group=row2)
install.packages("multcomp",repos="http://cran.ism.ac.jp/")
library(multcomp)
data1<-data.frame(group=row2,y=row1)
plot(row1~group,d=data)

vx=row1
fx=factor(rep(c("1","2","3","4","5"),c("98","99","100","99","100")))
fx
length(vx)
TukeyHSD(aov(vx~fx))



df <- read.csv("r-csv/通訳品質分散分析.csv",header=T)
df
row1<-df[,colnames(df)=="通訳品質"]
row2<-df[,colnames(df)=="グループ"]

oneway.test(row1~row2,var.equal=T)
library(lawstat)
levene.test(y=row1,group=row2)
library(multcomp)
data1<-data.frame(group=row2,y=row1)
plot(row1~group,d=data)

vx=row1
fx=factor(rep(c("1","2","3","4","5"),c("98","98","100","98","100")))
length(vx)
install.packages("dunn.test")
library(dunn.test)
dunn.test(row1,row2,method="bonferroni")
