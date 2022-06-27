export default function useItemHeight() {
  const getItemHeight = () => {
    const itemHeight = []
    return new Promise(resolve => {
      const itemElements = [
        ...document.getElementsByClassName('waterfall-item')
      ]
      itemElements.forEach(i => {
        itemHeight.push(i.offsetHeight)
        resolve(itemHeight)
      })
    })
  }

  return {
    getItemHeight
  }
}
