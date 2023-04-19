export type HTTPVerb = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export type FetcherClientOptions = { method?: HTTPVerb; body?: any } & (
  | {
      getToken: () => Promise<string | null>
      public?: false | undefined
    }
  | {
      public?: true
    }
)

export interface FetcherOptions {
  public?: boolean
  method?: HTTPVerb
  body?: any
}

export interface PosterOptions {
  getToken: () => Promise<string | null>
  body: any
}
