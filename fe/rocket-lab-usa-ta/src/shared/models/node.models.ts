export interface TreeNode {
  key: string,
  children: NodeChild[]
}

export interface NodeProperty {
  key: string,
  value?: any
}

export interface NodeChild extends NodeProperty {
  children?: (NodeChild | NodeProperty)[]
}
