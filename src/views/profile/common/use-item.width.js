import { ref, onMounted } from 'vue'
export default function useItemWidth(props) {
  const containerTarget = ref(null) //容器实例
  const itemWidth = ref(0)
  // 容器左边距，计算 item left 时，需要使用定位
  const containerLeft = ref(0)
  const useColumnWidth = () => {
    // 计算容器宽度
    const { paddingLeft, paddingRight } = getComputedStyle(
      containerTarget.value
    )
    containerLeft.value = parseFloat(paddingLeft)
    const containerWidth =
      containerTarget.value.offsetWidth -
      parseInt(paddingLeft) -
      parseInt(paddingRight)
    // 计算内容宽度
    itemWidth.value =
      (containerWidth - (props.colSpace * props.column - 1)) / props.column
  }
  onMounted(() => {
    useColumnWidth()
  })

  return {
    containerTarget,
    itemWidth,
    containerLeft
  }
}
