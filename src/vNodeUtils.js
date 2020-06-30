import pick from 'lodash.pick'
import assign from 'lodash.assign'
import get from 'lodash.get'

export const mergeVNodeData = (vnode, name, obj) => {
  if (!vnode) {
    return
  }

  vnode.data = vnode.data || {}
  vnode.data[name] = {
    ...vnode.data[name],
    ...obj,
  }
}

export const setVNodeData = (vnode, name, value) => {
  if (!vnode) {
    return
  }

  vnode.data = vnode.data || {}
  vnode.data[name] = value
}

const DATA_KEYS = [
  'class',
  'staticClass',
  'style',
  'attrs',
  'props',
  'domProps',
  'on',
  'nativeOn',
  'directives',
  'scopesSlots',
  'slot',
  'ref',
  'key',
]

function mutateKey(key) {
  return '' + key + `-cloned-cid`
}

function extractData(vnode, isComp) {
  const data = pick(vnode.data, DATA_KEYS)
  if (isComp) {
    const cOpts = vnode.componentOptions
    assign(data, {
      props: cOpts.propsData,
      on: cOpts.listeners,
    })
  }

  if (data.key) {
    data.key = mutateKey(data.key)
  }

  return data
}

export const cloneVNode = vnode => {
  // use the context that the original vnode was created in.
  const h = vnode.context && vnode.context.$createElement
  const isComp = !!vnode.componentOptions
  const isText = !vnode.tag // this will also match comments but those will be dropped, essentially
  const children = isComp ? vnode.componentOptions.children : vnode.children

  if (isText) return vnode.text

  const data = extractData(vnode, isComp)

  const tag = isComp ? vnode.componentOptions.Ctor : vnode.tag

  const childNodes = children ? children.map(c => cloneVNode(c)) : undefined
  return h(tag, data, childNodes)
}

export const copyClassesFrom = (vnode, from) => {
  const { data = {} } = from
  setVNodeData(vnode, 'staticClass', data.staticClass)
  mergeVNodeData(vnode, 'class', {
    ...data.class,
    ...from,
  })
}

export const getData = (vnode, path, defaultValue) => {
  if (!vnode) {
    return
  }
  const data = vnode.data || {}

  return typeof path === 'undefined' ? data : get(data, path, defaultValue)
}

export const getStyle = vnode => {
  return {
    ...getData(vnode, 'staticStyle', {}),
    ...getData(vnode, 'style', {}),
  }
}
