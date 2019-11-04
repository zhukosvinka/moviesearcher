export const loadData = async (url) => {
  const data = await fetch(url)
  const jsonData = await data.json()
  return jsonData
}