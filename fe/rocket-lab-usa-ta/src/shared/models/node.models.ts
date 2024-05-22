export interface NodeProperty {
  key: string,
  value?: number
}

export interface DataNode extends NodeProperty {
  children?: DataNode[]
}
