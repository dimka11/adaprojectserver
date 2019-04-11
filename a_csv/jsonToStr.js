function jsonToString(json_object) {
    if (json_object.hasOwnProperty('sensors')) return fromDataCollector(json_object)
    
    else return FromMyAndroidApp(json_object)

  }

function fromDataCollector(json_object)  {
    let stringToWrite = json_object.timestamp;
    stringToWrite += ',';
    stringToWrite += json_object.sensors[0].value0;
    stringToWrite += ',';
    stringToWrite += json_object.sensors[0].value1;
    stringToWrite += ',';
    stringToWrite += json_object.sensors[0].value2;
    stringToWrite += '\n';
    return stringToWrite;
}

function FromMyAndroidApp(json_object) {
    let stringToWrite = json_object.timestamp;
    stringToWrite += ',';
    stringToWrite += json_object.x
    stringToWrite += ',';
    stringToWrite += json_object.y
    stringToWrite += ',';
    stringToWrite += json_object.z
    stringToWrite += '\n';
    return stringToWrite;
}
module.exports = jsonToString