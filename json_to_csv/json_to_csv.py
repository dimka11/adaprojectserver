import json
import pandas as pd
import numpy as np


# not used
from pandas.io.json import json_normalize


def flattenjson( b, delim ):
    val = {}
    for i in b.keys():
        if isinstance( b[i], dict ):
            get = flattenjson( b[i], delim )
            for j in get.keys():
                val[ i + delim + j ] = get[j]
        else:
            val[i] = b[i]

    return val

def json_parse():
    json_file = open('B:/Server/adaprojectserver/a/acc_data.json')
    csv_file = open('B:/Server/adaprojectserver/a/acc_data.csv', "w", newline='')
    json_data = pd.read_json(json_file, lines=True)
    timestamp = json_data['timestamp']  # why timestamp is gone?
    sensors = json_data['sensors']
    dict = []

    for item in sensors:
        dict.append(json_normalize(item[0]))
    x = []
    y = []
    z = []
    for item in dict:
        x.append(item.values.item(0))
        y.append(item.values.item(1))
        z.append(item.values.item(2))

    data = {'timestamp': timestamp, 'x': x, 'y': y, 'z': z}
    df = pd.DataFrame(data=data)
    csv_data = df.to_csv()
    print(df.head())
    csv_file.write(csv_data)

def run():
    json_parse()
run()