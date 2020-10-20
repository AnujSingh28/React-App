import json
import requests
from datetime import date
import sqlite3

# def createDB(name):
#         connection = sqlite3.connect("weatherForecast.db")
#         curr = connection.cursor()
#         curr.execute("DROP TABLE IF EXISTS "+name)
#         curr.execute("create table "+name+"""(
#                         Date text,
#                         Temp text,
#                         Max_Min_temp text,
#                         Pressue text,
#                         Humidity text,
#                         Dew_point text,
#                         Wind_Speed text,
#                         Weather text,
#                         Rainfall text
#                         )""")
#         return [connection,curr]

def store_in_db(curr,list,name):
        l=list
        curr.execute("insert into "+name+" values (?,?,?,?,?,?,?,?,?)",(l[0],l[1],l[2],l[3],l[4],l[5],l[6],l[7],l[8],))


f=open('./data_handling/location_data.json',encoding="utf8")
data=json.load(f)

for feature in data['features']:
    lat=str(feature['latitude'])
    lon=str(feature['longitude'])
    name = feature['Name']
    # dbconnect = createDB(name)
    connection = sqlite3.connect("weatherForecast.db")
    curr = connection.cursor()
    curr.execute("DROP TABLE IF EXISTS "+name)
    curr.execute("create table "+name+"""(
                    Date text,
                    Temp text,
                    Max_Min_temp text,
                    Pressue text,
                    Humidity text,
                    Dew_point text,
                    Wind_Speed text,
                    Weather text,
                    Rainfall text
                    )""")
    url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid=6bf14daf957e61943c0425ded384191e"
    
    response = requests.get(url)
    response_dict = json.loads(response.text)

    for element in response_dict['daily']:
        l=[]
        l.append(element['dt'])
        l.append(element['temp']['day'])
        l.append(str(element['temp']['max'])+'/'+str(element['temp']['min']))
        l.append(element['pressure'])
        l.append(element['humidity'])
        l.append(element['dew_point'])
        l.append(element['wind_speed'])
        l.append(element['weather'][0]['description'])
        if 'rain' in element.keys():
            l.append(element['rain'])
        else:
            l.append('0')
        
        store_in_db(curr,l,name)
    connection.commit()

f.close()
        
