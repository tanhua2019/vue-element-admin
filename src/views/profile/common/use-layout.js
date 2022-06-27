import { ref } from 'vue'
import { getMinHeight, getMinColumn, getMaxColumn } from './utils'
export default function useLayout(props, itemHeight, itemWidth, containerLeft) {
  // 记录每列高度的容器。key：所在列  val：列高
  const columnHeightObj = ref({})
  const useColumnHeight = () => {
    columnHeightObj.value = {}
    for (let i = 0; i < props.column; i++) {
      columnHeightObj.value[i] = 0
    }
  }
  const increasingHeight = i => {
    const column = getMinColumn(columnHeightObj.value)
    columnHeightObj.value[column] += itemHeight.value[i] + props.rowSpace
  }

  const getItemLeft = () => {
    const column = getMinColumn(columnHeightObj.value)
    return (column * (itemWidth.value + props.colSpace)) + containerLeft.value
  }

  // 容器高度实例
  const containerHeight = ref(0)
  const useItemLocation = () => {
    props.list.forEach((item, index) => {
      if (item.style) return
      item.style = {}
      item.style.left = getItemLeft()
      item.style.top = getMinHeight(columnHeightObj.value)
      increasingHeight(index)
    })
    // 指定容器高度
    containerHeight.value = getMaxColumn(columnHeightObj.value)
  }

  return {
    useColumnHeight,
    containerHeight,
    useItemLocation
  }
}
