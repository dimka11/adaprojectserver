const fs = require('fs');

function jsonToString(json_object, filename) {
    if (json_object.hasOwnProperty('sensors')) return fromDataCollector(json_object)
    
    else return FromMyAndroidApp(json_object, filename)

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

function FromMyAndroidApp(json_object, filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats["size"]
    if (fileSizeInBytes === 0) {
        if (json_object.timestamp != undefined) {
            fs.appendFileSync(filename, 'timestamp,x,y,z \n', (err) => { if (err) console.log('error happend') });
        }
        else {
            fs.appendFileSync(filename, 'x,y,z \n', (err) => { if (err) console.log('error happend') });
        }
    }

    let stringToWrite = "";
    if (json_object.timestamp != undefined) {
        stringToWrite += json_object.timestamp;
        stringToWrite += ',';
    }
    if (json_object.label != undefined) {
        stringToWrite += json_object.label
        stringToWrite += ',';
    }
    stringToWrite += json_object.x
    stringToWrite += ',';
    stringToWrite += json_object.y
    stringToWrite += ',';
    stringToWrite += json_object.z
    stringToWrite += '\n';
    return stringToWrite;
}
module.exports = jsonToString