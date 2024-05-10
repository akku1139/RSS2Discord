const feeds: Array<{
  name: string,
  url: string,
  icon?: string,
  host?: string, // Proxyしたフィードのホスト名
}> = [
  {
    name: "虚構新聞",
    url: "https://kyoko-np.net/index.xml",
    icon: "https://kyoko-np.net/images/app.png",
  },
]

export default feeds;
