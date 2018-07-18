import * as Knex from "knex";

export function primaryUUID(
  knex: Knex,
  table: Knex.CreateTableBuilder,
  primaryKey = "id"
) {
  return table.uuid(primaryKey).primary()
    .defaultTo(knex.raw("uuid_generate_v1mc()"));
}

export function timestamps(knex: Knex, table: Knex.CreateTableBuilder) {

  table.timestamp("createdAt").defaultTo(knex.fn.now());
  table.timestamp("updatedAt").defaultTo(knex.fn.now());
}

export function fileColumns(
  table: Knex.CreateTableBuilder, name = "file") {
  table.binary(`${name}Data`);
  table.text(`${name}Name`).notNullable().defaultTo("");
  table.text(`${name}Extension`).notNullable().defaultTo("");
}

export function createFileTable(
  knex: Knex, schemaName: string, tableName: string
): Knex.SchemaBuilder {

  return knex.schema.withSchema(schemaName)
    .createTable(tableName, (table) => {

      primaryUUID(knex, table);
      table.uuid("subjectId").notNullable();
      table.text("name").notNullable().defaultTo("");
      table.text("description").notNullable().defaultTo("");

      fileColumns(table);
      timestamps(knex, table);

      table.text("status").notNullable();

      table.index(["subjectId", "status"]);
    });
}
