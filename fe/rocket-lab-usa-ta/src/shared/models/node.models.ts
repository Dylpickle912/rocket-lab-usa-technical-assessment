// Used for creating property rather than node so value is defined
export interface NodeProperty {
  key: string,
  value: number
}

// Used for data tree
export interface DataNode {
  key: string,
  value?: number,
  children?: DataNode[]
}
