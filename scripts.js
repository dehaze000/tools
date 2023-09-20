//function below is called at confirmation press
function elaborateInput() {
    const sourceInput = document.querySelector('.sourcedata-input').value;
    const inputObject = JSON.parse(sourceInput);
    console.log(inputObject);

    const inputPropertiesString = document.querySelector('.properties-input').value;
    const selectedProperties = JSON.parse(inputPropertiesString);


    function readSourceInput(arr, selectedProperties) {
        return arr.map((obj) => {
            const extractedObj = {};

            function extractProperty(obj, propertyPath) {
                const props = propertyPath.split('.');
                let value = obj;
                for (const prop of props) {
                    if (Array.isArray(value)) {
                        value = value.map((item) => {
                            if (item.hasOwnProperty(prop)) {
                                return item[prop];
                            } else {
                                return undefined;
                            }
                        });
                    } else if (value && value.hasOwnProperty(prop)) {
                        value = value[prop];
                    } else {
                        value = undefined;
                        break;
                    }
                }
                return value;
            }

            selectedProperties.forEach((prop) => {
                extractedObj[prop] = (extractProperty(obj, prop));
            });

            return extractedObj;
        });
    }

    const extractedObj = readSourceInput(inputObject, selectedProperties);
    console.log(extractedObj);


    const table = document.querySelector('.output-table');

    createTableOutput(table,selectedProperties,extractedObj);
}

function createTableOutput (table, headers, data) {

    //clear current table
    let currentTable = document.querySelector('.output-table');
    while (currentTable.firstChild) {
        currentTable.removeChild(currentTable.firstChild);
    }

    //create header row
    const row = document.createElement('tr');
    headers.forEach((prop) => {
        const headerUnit = document.createElement('th');
        headerUnit.textContent = prop;
        row.appendChild(headerUnit);
    });
    table.appendChild(row);

    //data is an array of objects. Each object is a new tr
    for(let i=0; i < data.length; i++) {
        const row = document.createElement('tr');
        for(let j=0; j < Object.keys(data[i]).length; j++) {
            const td = document.createElement('td');
            let tdData = Object.values(data[i]);
            td.textContent = tdData[j];
            row.appendChild(td);
        }
        table.appendChild(row);
    }

}

