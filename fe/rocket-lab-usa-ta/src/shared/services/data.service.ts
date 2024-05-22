import {Injectable} from "@angular/core";
import {DataNode, NodeProperty} from "../models/node.models";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: DataNode = {
    key: 'Rocket',
    children: [
      { key: 'Height', value: 18.000 },
      { key: 'Mass', value: 12000.000 },
      {
        key: 'Stage1',
        children: [
          { key: 'Engine1', children: [
              { key: 'Thrust', value: 9.493 },
              { key: 'ISP', value: 12.156 }
            ]
          },
          { key: 'Engine2', children: [
              { key: 'Thrust', value: 9.413 },
              { key: 'ISP', value: 11.632 }
            ]
          },
          { key: 'Engine3', children: [
              { key: 'Thrust', value: 9.899 },
              { key: 'ISP', value: 12.551 }
            ]
          }
        ]
      },
      {
        key: 'Stage2',
        children: [
          { key: 'Engine1', children: [
              { key: 'Thrust', value: 1.622 },
              { key: 'ISP', value: 15.110 }
            ]
          }
        ]
      }
    ]
  }

  private collectPaths(node: DataNode, path: string = '', paths: string[] = []): string[] {
    const currentPath = path ? `${path}/${node.key}` : node.key;
    paths.push(currentPath);

    if (!node.children) return paths;
    for (const child of node.children) {
      this.collectPaths(child, currentPath, paths);
    }
    return paths;
  }

  public searchPaths(filter: string): string[] {
    const rows = this.collectPaths(this.data).filter(path => path.toLowerCase().includes(filter.toLowerCase()));
    return rows;
  }

  public createNode(path: string, nodeName: string): void {
    const parentNode = this.findNode(path);
    if (!parentNode) return;
    if (!parentNode.children) parentNode.children = [];
    if (parentNode.children.find(child => child.key === nodeName)) return;
    parentNode.children.push({ key: nodeName });
  }

  public addProperty(path: string, property: NodeProperty): void {
    const node = this.findNode(path);
    if (!node) return;
    if (!node.children) node.children = [];
    node.children.push(property);
  }

  public getSubtree(path: string): DataNode | undefined {
    return this.findNode(path);
  }

  private findNode(path: string): DataNode | undefined {
    const parts = path.split('/').filter(part => part);

    if (parts.length === 0) {
      return undefined;
    }

    let currentNode: DataNode | undefined = this.data;

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (!currentNode || !currentNode.children) {
        return undefined;
      }
      currentNode = currentNode.children.find(child => child.key === part);
    }
    return currentNode as DataNode | undefined;
  }

  public deleteNode(path: string): void {
    const parts = path.split('/').filter(part => part);

    if (parts.length === 0) {
      return;
    }

    let parentNode: DataNode | undefined = undefined;
    let currentNode: DataNode | undefined = this.data;

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (!currentNode || !currentNode.children) {
        return;
      }
      parentNode = currentNode;
      currentNode = currentNode.children.find(child => child.key === part);
    }

    if (!currentNode) {
      return;
    }

    if (parentNode && parentNode.children) {
      parentNode.children = parentNode.children.filter(child => child.key !== currentNode.key);
    }
  }
}
