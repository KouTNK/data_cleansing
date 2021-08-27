install.packages("irr",dep=TRUE)
library(irr)
df <- read.csv("r-csv/通訳品質1（フライスのカッパ）.csv",header=T,fileEncoding="CP932")
df
kappam.fleiss(df)
kendall(df,correct = FALSE)
