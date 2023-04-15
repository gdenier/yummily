export const env = {
  DEV: process.env.NODE_ENV === "development",
  DATABASE_URL: process.env.DATABASE_URL as string,
}
