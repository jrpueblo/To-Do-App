/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mwufkdt2x4pvq0l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "suhlvmqm",
    "name": "completed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mwufkdt2x4pvq0l")

  // remove
  collection.schema.removeField("suhlvmqm")

  return dao.saveCollection(collection)
})
