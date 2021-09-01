## Mock API

### Description
This is a application which serves as a mock for persisting data to a database. It mirrors the implementation of the [Zuri Core application](https://github.com/zurichat/zc_core/tree/main/data#readme)

### API Documentation

#### Create Data 

- Endpoint-> POST `/api/data/write`
- Sample Payload-> 
```js
{
    "plugin_id": "reminders_id", 
    "organization_id": "Darwin_organization", 
    "collection_name": "Reminders", 
    "bulk_write": false, 
    "payload": {
		"priority": 2,
		"expiryDate": "01-01-2021",
		"description": "Obi is a boy",
		"shouldRemind": true
    }
}
```

- Responses
  - Success response-> 201
    ```js
        {
            "plugin_id": "reminders_id",
            "organization_id": "Darwin_organization",
            "collection_name": "Reminders",
            "bulk_write": false,
            "object_id": "612f9755f859d93403683912",
            "payload": {
                "priority": 2,
                "expiryDate": "01-01-2021",
                "description": "Obi is a boy",
                "shouldRemind": true
            }
        }
    ``` 

  - Error response-> 422
    ```js 
      {
        "error": "Invalid Payload Format. Expected an Array"
      }
    ```


#### Update Data 

- Endpoint-> PUT `/api/data/write`
- Sample Payload-> 
```js
{
    "plugin_id": "reminders_id", 
    "organization_id": "Darwin_organization", 
    "collection_name": "Reminders", 
    "bulk_write": false,
    "object_id":"612fa7721112f088962c76ad",
    "filter": {
    	"priority": 1,
    	"shouldRemind": true
    },
    "payload": {
		"priority": 2,
		"expiryDate": "01-01-2021",
		"description": "Obi is a boy",
		"shouldRemind": true
    }
}
```

- Responses
  - Success response-> 200
    ```js
        {
          "success": true,
          "message": "0 document(s) found and 0 document(s) modified."
        }
    ``` 

  - Error response-> 422
    ```js 
      {
        "error": "Invalid Payload Format. Expected an Array"
      }
    ``` 
