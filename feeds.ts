const feeds: Array<{
  name: String,
  url: String,
  icon?: String,
  host?: String, // Proxyしたフィードのホスト名
}> = [
  {
    name: "虚構新聞",
    url: "https://kyoko-np.net/index.xml",
    icon: "https://kyoko-np.net/images/app.png",
  },
]

export default feeds;
