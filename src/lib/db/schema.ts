import { InferModel, sql } from "drizzle-orm"
import {
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

const entityFields = {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}

export interface Recipe extends InferModel<typeof recipes> {}
export const recipes = pgTable(
  "recipes",
  {
    ...entityFields,
    title: varchar("title", { length: 120 }).notNull(),
    description: text("description"),
    preparationTime: integer("preparation_time"),
    restTime: integer("rest_time"),
    bakingTime: integer("baking_time"),

    userId: varchar("user_id", { length: 255 }).notNull(),
    organizationId: varchar("organization_id", { length: 255 }),
  },
  (recipes) => ({
    titleOrganisationIndex: index("title_organisation_index").on(
      recipes.title,
      recipes.organizationId
    ),
    titleUserIndex: index("title_user_index").on(recipes.title, recipes.userId),
  })
)

export interface Step extends InferModel<typeof steps> {}
export const steps = pgTable("steps", {
  ...entityFields,
  content: text("content").notNull(),
  index: integer("index").notNull(),

  recipeId: uuid("recipe_id").references(() => recipes.id),
})

export interface Ingredient extends InferModel<typeof ingredients> {}
export const ingredients = pgTable("ingredients", {
  ...entityFields,
  name: varchar("name", { length: 255 }).notNull(),
})

export const unitEnum = pgEnum("unit", [
  "gram",
  "kilogram",
  "centilitre",
  "mililitre",
  "liter",
  "tablespoon",
  "teaspoon",
  "pinch",
  "raw",
])

export interface RecipeIngredient
  extends InferModel<typeof recipeIngredients> {}
export const recipeIngredients = pgTable(
  "recipe_ingredients",
  {
    recipeId: uuid("recipe_id").references(() => recipes.id),
    ingredientId: uuid("ingredient_id").references(() => ingredients.id),

    // Must be save in integer and retrieve in the right format depends on unit if float is necessary
    quantity: integer("quantity").notNull(),
    unit: unitEnum("unit"),
  },
  (recipeIngredients) => ({
    primaryKey: primaryKey(
      recipeIngredients.recipeId,
      recipeIngredients.ingredientId
    ),
  })
)
