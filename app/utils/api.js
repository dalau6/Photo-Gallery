export async function getPhotos() {
  let url = 'https://picsum.photos/list'
  const response = await fetch(url)
  const photos = await response.json()
  let id = []
  photos.map((index) => (id.push({ src: 'https://picsum.photos/300/300/?image=' + index.id, width: 1, height: 1 })))
  return id
}