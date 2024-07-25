/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mwufkdt2x4pvq0l")

  // remove
  collection.schema.removeField("cbpl4vmx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "itkc7hdq",
    "name": "content",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mwufkdt2x4pvq0l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cbpl4vmx",
    "name": "content",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("itkc7hdq")

  return dao.saveCollection(collection)
})
