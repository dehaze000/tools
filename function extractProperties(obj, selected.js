function extractProperties(obj, selectedProperties) {
  const extractedValues = [];

  // Helper function to handle nested properties
  function extractProperty(obj, propertyPath) {
    const props = propertyPath.split('.');
    let value = obj;
    for (const prop of props) {
      if (Array.isArray(value)) {
        // Handle arrays by flattening them and adding elements to the result
        value.forEach((item) => {
          if (item.hasOwnProperty(prop)) {
            value = item[prop];
          } else {
            value = ''; // Set an empty string if the property doesn't exist
          }
        });
      } else if (value && value.hasOwnProperty(prop)) {
        value = value[prop];
      } else {
        value = ''; // Set an empty string if the property doesn't exist
        break;
      }
    }
    return value;
  }

  // Extract properties from the object
  selectedProperties.forEach((prop) => {
    extractedValues.push(extractProperty(obj, prop));
  });

  return extractedValues;
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

// Extract properties into an array
const extractedValues = extractProperties(dataObject, selectedProperties);

console.log(extractedValues);
