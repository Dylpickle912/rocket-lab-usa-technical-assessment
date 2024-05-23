export interface NodeProperty {
  key: string,
  value?: number,
  createdDate: Date
}

export interface DataNode extends NodeProperty {
  children?: DataNode[]
}
