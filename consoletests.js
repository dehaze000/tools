const testJson = `[
    {
    "prop1":"test1",
    "prop2":123,
    "prop3":true,
    "nest":{
        "prop1":"testnest"
    },
    "array":[
        {
            "prop1":"testarray1",
            "prop2":"testarray2"
        }
    ]
},    {
    "prop1":"test2",
    "prop2":123456,
    "prop3":false,
    "nest":{
        "prop1":"test2nest"
    },
    "array":[
        {
            "prop1":"test2array1"
        }
    ]
}]`

const inputObject = JSON.parse(testJson);
console.log(inputObject)



const container = document.querySelector('.output-container');
function createTableOutput (container) {
    const table = document.createElement('table');
    container.appendChild(table);
}