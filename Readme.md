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


#### Delete Data 

- Endpoint-> DELETE `/api/data/write`
- Sample Payload (delete One)-> 
```js
{
    "plugin_id": "reminders_id", 
    "organization_id": "Darwin_organization", 
    "collection_name": "Reminders", 
    "bulk_write": false,
    "object_id":"612fa7721112f088962c76ad"
}
```
- Sample Payload (delete Many)-> 
```js
{
    "plugin_id": "reminders_id", 
    "organization_id": "Darwin_organization", 
    "collection_name": "Reminders", 
    "bulk_write": true,
    "filter": {
    	"priority": 1,
    	"shouldRemind": true
    }
}
```

- Responses
  - Success response-> 200
    ```js
        {
          status: "success",
          "message": "Data deleted"
        }
    ``` 

  - Error response-> 422
    ```js 
      {
        "error": "Invalid Delete Request. object_id is needed"
      }
    ``` 


#### Search Data 

- Endpoint-> POST `/api/data/read/:plugin_id/:collection_name/:organization_id?object_id`
- Sample Payload-> 
```js
    "filter": {
    	"priority": 1,
    	"shouldRemind": true
    }
```

- Responses
  - Success response-> 201
    ```js
        {
    "result": [
        {
            "_id": "6130eeb9b9944cff3b518cc7",
            "plugin_id": "reminders_id",
            "organization_id": "Darwin_organization",
            "collection_name": "Reminders",
            "payload": {
                "priority": 1,
                "expiryDate": "03-01-2021",
                "description": "Obiina is a boy",
                "shouldRemind": false
            },
            "__v": 0
        },
        {
            "_id": "6130eebeb9944cff3b518ccc",
            "plugin_id": "reminders_id",
            "organization_id": "Darwin_organization",
            "collection_name": "Reminders",
            "payload": {
                "priority": 5,
                "expiryDate": "08-01-2020",
                "description": "ade is a winner",
                "shouldRemind": true
            },
            "__v": 0
        }
    ]
}
    ``` 

  - Error response-> 422
    ```js 
      { errStack: ,
      errMessage: 
     }
    ```


#### Find Data 

- Endpoint-> GET `/api/data/read/:plugin_id/:collection_name/:organization_id?object_id`

- Responses
  - Success response-> 201
    ```js
        {
    "result": [
        {
            "_id": "6130eeb9b9944cff3b518cc7",
            "plugin_id": "reminders_id",
            "organization_id": "Darwin_organization",
            "collection_name": "Reminders",
            "payload": {
                "priority": 1,
                "expiryDate": "03-01-2021",
                "description": "Obiina is a boy",
                "shouldRemind": false
            },
            "__v": 0
        },
        {
            "_id": "6130eebeb9944cff3b518ccc",
            "plugin_id": "reminders_id",
            "organization_id": "Darwin_organization",
            "collection_name": "Reminders",
            "payload": {
                "priority": 5,
                "expiryDate": "08-01-2020",
                "description": "ade is a winner",
                "shouldRemind": true
            },
            "__v": 0
        }
    ]
}
    ``` 

  - Error response-> 422
    ```js 
      { errStack: ,
      errMessage: 
     }
    ```

