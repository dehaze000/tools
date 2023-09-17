function objectToTabSeparated(obj, selectedProperties) {
  const tsvRows = [];

  // Helper function to handle nested properties
  function extractProperty(obj, propertyPath) {
    const props = propertyPath.split('.');
    let value = obj;
    for (const prop of props) {
      if (Array.isArray(value)) {
        // Handle arrays by flattening them into a tab-separated string
        value = value.map((item) => item[prop]).join('\t');
      } else if (value && value.hasOwnProperty(prop)) {
        value = value[prop];
      } else {
        value = ''; // Set an empty string if the property doesn't exist
        break;
      }
    }
    return value;
  }

  // Header row
  const headerRow = selectedProperties.join('\t');
  tsvRows.push(headerRow);

  // Extract properties from the object
  const tsvRow = selectedProperties.map((prop) => {
    return extractProperty(obj, prop);
  });

  tsvRows.push(tsvRow.join('\t'));

  return tsvRows.join('\n');
}

// Example object with nested properties and arrays
const dataObject = {
  name: 'John',
  age: 25,
  address: {
    city: 'New York',
    country: 'USA'
  },
  hobbies: [
    { name: 'Reading', type: 'Indoor' },
    { name: 'Hiking', type: 'Outdoor' }
  ]
};

// Example properties to extract, including a nested property and an array property
const selectedProperties = ['name', 'age', 'address.city', 'hobbies.name'];

// Convert object to tab-separated file
const tsvOutput = objectToTabSeparated(dataObject, selectedProperties);

console.log(tsvOutput);
