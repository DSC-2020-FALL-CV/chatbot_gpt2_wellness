import pandas as pd

file="./backend/data/웰니스_대화_스크립트_데이터셋_수정.xlsx"

wellnessData=pd.read_excel(file)

label=wellnessData.iloc[0, 0]
labelNum=3

processedWellnessData=[]

#새로운 csv 파일 제작
for i in wellnessData.index:
    eachData=wellnessData.loc[i]

    if (eachData['구분']!=label):
        labelNum+=1
        label=eachData['구분']

    data={'Q':eachData['유저'], 'A':eachData['챗봇'], 'label':labelNum}
    processedWellnessData.append(pd.DataFrame(data,
    columns=['Q','A','label'], index=[i]))

processedWellnessData=pd.concat(processedWellnessData, axis=0, ignore_index=True)

chatbotData=pd.read_csv("./backend/data/ChatbotData.csv",encoding='utf-8',engine='python')

totalData=chatbotData.append(processedWellnessData, sort=False)
totalData.to_csv('./backend/data/newChatbotData.csv',encoding='cp949',index=False)