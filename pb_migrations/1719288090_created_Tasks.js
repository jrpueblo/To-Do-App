/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mwufkdt2x4pvq0l",
    "created": "2024-06-25 04:01:30.636Z",
    "updated": "2024-06-25 04:01:30.636Z",
    "name": "Tasks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gywdthqs",
        "name": "field",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "cbpl4vmx",
        "name": "field1",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mwufkdt2x4pvq0l");

  return dao.deleteCollection(collection);
})
