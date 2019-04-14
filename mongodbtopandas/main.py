import pandas as pd
from pymongo import MongoClient


def get_data():
    client = MongoClient()
    db = client.AccData
    collection = db.accdatas
    #data = pd.DataFrame(list(collection.find({"_id": 0, "timestamp": 1, "sensors": 1})))
    filter = {}
    project = {"_id":0, "timestamp":1, "sensors":1}
    pipeline = [{"$unwind": "$sensors"}, {"$unwind": "$sensors"}]
    cursor = collection.aggregate(pipeline)
    subquery = list(cursor)

    data = pd.DataFrame(list(collection.find(filter, project)))

    print(data.head())

get_data()