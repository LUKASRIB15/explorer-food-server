exports.up = knex=>knex.schema.alterTable("meal", table=>{
  table.enum("category", ["meal", "dessert", "drink"], {useNative: true, enumName: "categories"}).notNullable().default("meal").alter()
})

exports.down = knex=>knex.schema.dropTable("meal")
