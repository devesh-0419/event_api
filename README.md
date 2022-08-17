# Event API

A nudge creation API. Where you can create nudge for any event.
### Postman documentation
``` 🔗 Links
[Document](https://documenter.getpostman.com/view/22822443/VUjTiN1w)
```


## MODEL
##### data to be entered before publish
| KEY                | Value                       |
| :----------------- | :-------------------------- |
|tag                 | (event id)                  |
|Title               | "string"                    |
| Image              | Image file                  |
| Schedule           | date + time                 |
| Timing/duration    | from time(hh:mm:ss) to time |
| discription        |"string"                     |
| One line invitation| "string"                    |



## API Reference

#### Get event by Id

```http
  GET /api/v3/app/events?id=$
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uid` | **Required**. unique id to get that event |

#### Get item by recency and page

```http
  GET /api/v3/app/events?type=latest&limit=5&page=1
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `latest` | **Required**. sort event by recency |
| `limit`      | `number` | **Required**. event to be present per page |
| `page`      | `number` | **Required**. page number |

#### Post item  
```http
  POST /api/v3/app/events
```
#### BODY raw (json)
###### Where the body of the request contains the following key
######  value pairs.
```json
{
  "uid": 3,
  "type": "event",
  "name": "11",
  "tagline": "",
  "schedule": "2022-08-13T10:12:15.346Z",
  "description": "String",
  "files[image]": "Image file (File upload)",
  "moderator": "1",
  "category": "Get together",
  "sub_category": "reunion",
  "rigor_rank": 6,
  "attendees": [
    1,
    2,
    3,
    4
  ]
}
```

#### Update an item with an id
```http
  PUT /api/v3/app/events/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uid` | **Required**. unique id to get that event |

```json
{
  "description": "ABC",
}
```

#### Delete an item with an id

```http
  DELETE /api/v3/app/events/:id
```