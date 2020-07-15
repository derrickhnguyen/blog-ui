export declare global {
  interface Window {
    fbAsyncInit: () => void
    FB: {
      init: (args: {
        appId: string
        cookie: boolean
        xfbml: boolean
        version: string
      }) => void
      AppEvents: { logPageView: () => void }
      getLoginStatus: (cb: (resp: Record<string, string>) => any) => void
      login: (
        cb: (resp: Record<string, string>) => any,
        options: Record<string, string>
      ) => void
    }
  }
}
