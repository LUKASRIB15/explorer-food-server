exports.up = knex => knex.schema.createTable("meal", table=>{
  table.increments("id"),
  table.text("avatar"),
  table.text("name"),
  table.enum("category", ["Refeições"], {useNative: true, enumName: "roles"}).notNullable().default("client"),
  table.float("price", 2),
  table.text("description"),
  table.integer("user_id").references("id").inTable("user")
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("meal")
