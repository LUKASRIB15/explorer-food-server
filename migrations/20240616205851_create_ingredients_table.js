exports.up = knex => knex.schema.createTable("ingredients", table=>{
  table.increments("id"),
  table.integer("meal_id").references("id").inTable("meal").onDelete("CASCADE"),
  table.text("name").notNullable()
})

exports.down = knex => knex.schema.dropTable("ingredients")
