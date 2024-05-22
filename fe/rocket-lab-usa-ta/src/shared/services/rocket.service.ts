import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {DataNode, NodeProperty} from "../models/node.models";

@Injectable()
export class RocketService {

  constructor(private readonly dataService: DataService) { }

  // Debating whether to add Rocket model

  public fetchRocketDetails(path?: string): DataNode | undefined {
    return this.dataService.getSubtree(this.returnPath(path));
  }

  public addNode(key: string, path?: string): void {
    this.dataService.createNode(this.returnPath(path), key);
  }

  public addProperty(property: NodeProperty, path?: string): void {
    this.dataService.addProperty(this.returnPath(path), property);
  }

  public deleteNode(path: string): void {
    this.dataService.deleteNode(this.returnPath(path));
  }

  private returnPath(path?: string): string {
    return '/Rocket' + path;
  }
}
