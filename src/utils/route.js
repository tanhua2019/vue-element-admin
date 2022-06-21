import path from 'path'

const filterChildRouters = routes => {
  let result = []
  routes.forEach(i => {
    if (i?.children?.length > 0) {
      result.push(...i.children)
    }
  })
  return result
}

export const filterRouters = routes => {
  // 将路由子类筛选出来
  const childRoutes = filterChildRouters(routes)
  // 去除所有的子级路由
  return routes.filter(route => {
    return !childRoutes.find(i => i.path === route.path)
  })
}

const isNull = o => {
  if (!o) return true
  if (JSON.stringify(o) === '{}') return true
  if (JSON.stringify(o) === '[]') return true
  return false
}

export const menuList = (routes, basePath = '') => {
  const result = []
  routes.forEach(item => {
    if (isNull(item.meta) && isNull(item.children)) return
    // 处理个人中心没有meta有children
    if (isNull(item.meta) && !isNull(item.children)) {
      return result.push(...menuList(item.children))
    }
    const routePath = path.resolve(basePath, item.path)
    // 父路由相同时，不再重新声明route，用原有的继续添加children
    let route = result.find(i => i.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    // 有子级递归
    if (item.children) {
      route.children.push(...menuList(item.children, route.path))
    }
  })
  return result
}
