

def get_data_Data_Collector_app():
    # data = pd.DataFrame(list(collection.find({"_id": 0, "timestamp": 1, "sensors": 1})))
    # filter = {}
    # project = {"_id":0, "timestamp":1, "sensors":1}

    import pandas as pd
    from pymongo import MongoClient
    client = MongoClient()
    db = client.AccData
    collection = db.accdatas
    pipeline = [
        {"$unwind": "$sensors"},
        {"$replaceRoot": {"newRoot": {"$mergeObjects": ["$sensors", {"timestamp": "$timestamp"}]}}},
        {"$project": {
            "timestamp": "$timestamp",
            "x": "$value0",
            "y": "$value1",
            "z": "$value2"
        }}
    ]
    cursor = collection.aggregate(pipeline)
    data = pd.DataFrame(list(cursor))
    print(data.head())


get_data_Data_Collector_app()
