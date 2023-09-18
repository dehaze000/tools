function extractPropertiesFromArray(arr, selectedProperties) {
    return arr.map((obj) => {
      const extractedObj = {};
  
      // Helper function to handle nested properties
      function extractProperty(obj, propertyPath) {
        const props = propertyPath.split('.');
        let value = obj;
        for (const prop of props) {
          if (Array.isArray(value)) {
            // Handle arrays by flattening them and adding elements to the result
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
            value = undefined; // Set undefined if the property doesn't exist
            break;
          }
        }
        return value;
      }
  
      // Extract properties from the object
      selectedProperties.forEach((prop) => {
        extractedObj[prop] = extractProperty(obj, prop);
      });
  
      return extractedObj;
    });
  }
  
  // Example array of objects with nested properties and arrays
  const dataArray = [
    {
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
    },
    {
      name: 'Emma',
      age: 30,
      address: {
        city: 'London',
        country: 'UK'
      },
      hobbies: [
        { name: 'Painting', type: 'Indoor' },
        { name: 'Cycling', type: 'Outdoor' }
      ]
    }
  ];
  
  // Example properties to extract, including a nested property and an array property
  const selectedProperties = ['name', 'age', 'address.city', 'hobbies.name'];
  
  // Extract properties into an array of objects
  const extractedObjects = extractPropertiesFromArray(dataArray, selectedProperties);
  
  console.log(extractedObjects);
  