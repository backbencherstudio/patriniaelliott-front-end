// server base url
export const URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "https://backend.naamstay.com";
// app config
export const AppConfig = () => ({
  app: {
    // server endpoint
    url: URL,
    name: "Naamstay",
    slogan: "Naamstay",
    meta: {
      description: "naamstay",
      keywords: "naamstay",
    },

    // api endpoint
    apiUrl: `${URL}/api`,
  },
});
