function readSourceInput(obj, selectedProperties) {
    const csvRows = [];

    function extractProperty(obj, propertyPath) {
        const props = propertyPath.split('.');
        let value = obj;

        for (const prop of props) {
            if (Array.isArray(value)) {
                value = value.map((item) => item[prop]).join('\t');
            } else if (value && value.hasOwnProperty(prop)) {
                value = value[prop];
            } else {
                value = '';
                break;
            }
        }
        return value;
    }

    const headerRow = selectedProperties.join('\t');
    csvRows.push(headerRow);

    const csvRow = selectedProperties.map((prop) => {
        return extractProperty(obj,prop);
    });

    csvRows.push(csvRow.join('\t'));

    return csvRows.join('\n');
}


const testJson = `{
    "prop1":"test1",
    "prop2":123,
    "prop3":true,
    "nest":{
        "prop1":"testnest"
    },
    "array":[
        {
            "prop1":"testarray1"
        },
        {
            "prop1":"testarray2"
        }
    ]
}`

const sourceInput = document.querySelector('.sourcedata-input').value;
const inputObject = JSON.parse(sourceInput);

const selectedProperties = ['prop2', 'nest.prop1','array.prop1'];

const csvOutput = readSourceInput(inputObject, selectedProperties);
console.log(csvOutput);




function tsvToHtmlTable(tsvData) {
    // Split the TSV data into rows and columns
    const rows = tsvData.split('\n').map(row => row.split('\t'));

    // Create an HTML table element
    const table = document.createElement('table');

    // Iterate through the rows and columns to create table cells
    for (let i = 0; i < rows.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < rows[i].length; j++) {
            const cell = i === 0 ? document.createElement('th') : document.createElement('td');
            cell.textContent = rows[i][j];
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    return table;
}

// Example usage:
const tsvData = `Name    Age    City
John    30     New York
Alice   25     Los Angeles
Bob     35     Chicago`;

const tableElement = tsvToHtmlTable(tsvData);
document.body.appendChild(tableElement);


function showResult(csvOutput) {
    
}