exports.up = knex=>knex.schema.alterTable("meal", table=>{
  table.enum("category", ["meal", "dessert", "drink"], {useNative: true, enumName: "roles"}).notNullable().default("meal").alter()
})

exports.down = knex=>knex.schema.dropTable("meal")
