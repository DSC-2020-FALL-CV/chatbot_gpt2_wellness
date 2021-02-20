import pandas as pd

label = 0
labelNum=3

#웰니스 데이터 정제

processedWellnessData=[]

file="./backend/data/웰니스_대화_스크립트_데이터셋_수정.xlsx"
wellnessData=pd.read_excel(file)

label=wellnessData.iloc[0, 0]

for i in wellnessData.index:
    eachData=wellnessData.loc[i]

    if (eachData['구분']!=label):
        labelNum+=1
        label=eachData['구분']

    data={'Q':eachData['유저'], 'A':eachData['챗봇'], 'label':labelNum}
    processedWellnessData.append(pd.DataFrame(data,
    columns=['Q','A','label'], index=[i]))

processedWellnessData=pd.concat(processedWellnessData, axis=0, ignore_index=True)

#일상_오피스 데이터 정제
processedDailyOfficeData=[]
processedDailyOfficeTotalData=[]

for i in range(1,3):
    file = "./backend/data/일상_오피스_"+str(i)+".csv"
    dailyData=pd.read_csv(file, encoding='cp949', engine='python')
    dailyData=dailyData.dropna(axis=0)

    label=dailyData.iloc[0, 0]

    for j in dailyData.index:
        eachData=dailyData.loc[j]

        if (eachData['index']!=label):
            labelNum+=1
            label=eachData['index']

        data={'Q':eachData['user_utterance'], 'A':eachData['system_utterance'], 'label':labelNum}
        processedDailyOfficeData.append(pd.DataFrame(data, columns=['Q','A','label'], index=[j]))

processedDailyOfficeTotalData=pd.concat(processedDailyOfficeData, axis=0, ignore_index=True)

#트위터 대화 데이터 정제

processedTwitterData=[]

file="./backend/data/트위터_대화시나리오DB_2000Set.xlsx"
twitterData=pd.read_excel(file, usecols=[0,1], header=None)
twitterData.columns=['유저', '챗봇']

for i in twitterData.index:
    eachData=twitterData.loc[i]
    labelNum+=1

    data={'Q':eachData['유저'], 'A':eachData['챗봇'], 'label':labelNum}
    processedTwitterData.append(pd.DataFrame(data, columns=['Q','A','label'], index=[i]))

processedTwitterData=pd.concat(processedTwitterData, axis=0, ignore_index=True)


#데이터 통합
chatbotData=pd.read_csv("./backend/data/ChatbotData.csv",encoding='utf-8',engine='python')

totalData=chatbotData.append(processedWellnessData, sort=False)
totalData=totalData.append(processedDailyOfficeTotalData, sort=False)
totalData=totalData.append(processedTwitterData, sort=False)
totalData.to_csv('./backend/data/newChatbotData.csv',encoding='cp949',index=False)