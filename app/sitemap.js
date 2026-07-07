export default function sitemap() {
  const baseUrl = "https://tmmworld.com";

  // Static routes
  const routes = [
    "",
    "/company",
    "/expertise",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
