# JSONPowerDB Form Management System

## Description

This project aims to create a simple form management system using JSONPowerDB as the database. The system allows users to fill out a form, save the data, make changes to it, and reset the form if needed. JSONPowerDB provides a fast and efficient way to store and retrieve data, making it an ideal choice for this application.

## Benefits of using JsonPowerDB

- High performance and scalability
- Schema-less database structure
- Simple REST API for CRUD operations
- Inbuilt support for querying and indexing
- Low development and maintenance overhead

## Release History

- v1.0 (February 4, 2024): Initial release of the JsonPowerDB form management system code on GitHub.

## Table of Contents

1. Description
2. Benefits of using JsonPowerDB
3. Release History
4. Scope of Functionalities
5. Examples of Use
6. Project Status
7. Sources
8. Other Information

## Scope of Functionalities

- Create a form with customizable fields.
- Save form data to the JSONPowerDB database.
- Retrieve and display saved data for editing.
- Reset form to its initial state.

## Examples of Use

```javascript
// Example code for saving form data to JSONPowerDB
function saveFormDataToJSONPowerDB(formData) {
  return new Promise((resolve, reject) => {
    // Convert form data to JSON string
    const jsonData = JSON.stringify(formData);

    // Create a PUT request to save form data
    const putRequest = createPUTRequest(
      connToken,
      jsonData,
      empDBName,
      empRelationName
    );

    // Make a synchronous AJAX call to execute the PUT request
    jQuery.ajaxSetup({ async: false });
    const response = executeCommandAtGivenBaseUrl(
      putRequest,
      jpdbBaseURL,
      jpdbIML
    );
    jQuery.ajaxSetup({ async: true });

    // Check the response status and resolve or reject the promise accordingly
    if (response.status === 200) {
      resolve("Form data saved successfully");
    } else {
      reject("Error saving form data");
    }
  });
}

// Example usage:
const formData = {
  name: "John Doe",
  studentClass: "10",
  birthDate: "2005-05-20",
  address: "123 Main Street",
  enrollmentDate: "2023-09-01",
};

// Save form data to JSONPowerDB
saveFormDataToJSONPowerDB(formData)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Project Status

This project is now completed, with all the functionalities implemented and tested. Further enhancements and improvements may be considered in the future, but the core features are finalized.

## Sources

- JSONPowerDB Documentation: [Link](https://login2explore.com/jpdb/docs.html#jpdb-command-request)
- GitHub Repository: [Link](https://github.com/geekieujjwal/L2X-Assignment)

## Other Information

Feel free to contribute to the project by submitting pull requests or reporting issues on the GitHub repository.
