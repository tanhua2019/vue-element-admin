import { ref } from 'vue'
export default function useItemHeight() {
  const itemHeight = ref([])

  const usePromiseAll = imgs => {
    const promiseAll = []
    imgs.forEach((item, index) => {
      promiseAll[index] = new Promise(resolve => {
        const imgObj = new Image()
        imgObj.src = item
        imgObj.onload = () => {
          resolve()
        }
      })
    })
    return Promise.all(promiseAll)
  }
  const getItemHeight = () => {
    const itemElements = [...document.getElementsByClassName('waterfall-item')]
    const imgElements = itemElements.map(i => [...i.getElementsByTagName('img')]).flat()
    const imgSrc = imgElements.map(i => i.src)
    return usePromiseAll(imgSrc).then(() => {
      itemElements.forEach(i => {
        itemHeight.value.push(i.offsetHeight)
      })
      return Promise.resolve()
    })
  }

  return {
    itemHeight,
    getItemHeight
  }
}
