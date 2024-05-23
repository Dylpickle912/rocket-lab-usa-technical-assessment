import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'shavePaths',
  standalone: true
})
export class ShavePathsPipe implements PipeTransform {
  public transform(pathSuggestions: string[], currentPath: string, pathValid: boolean): string[] {
    /*
        What it should look like after each step:
        - ['Rocket/Stage1/Engine1/Thrust', 'Rocket/Stage1/Engine1/ISP', 'Rocket/Stage1/Engine2/Thrust', 'Rocket/Stage1/Engine2/ISP', 'Rocket/Stage1/Engine3/Thrust', 'Rocket/Stage1/Engine3/ISP']
        - ['Engine1/Thrust', 'Engine1/ISP', 'Engine2/Thrust', 'Engine2/ISP', 'Engine3/Thrust', 'Engine3/ISP']
        - ['Engine1', 'Engine1', 'Engine2', 'Engine2', 'Engine3', 'Engine3']
        - ['Engine1', 'Engine2', 'Engine3']

        Steps:
         - If current configuration is valid, get (currentPath + 1 index) from suggestion
         - If current configuration is not valid, get (currentPath - 1 index) from suggestion
         - Remove Like substring from new path suggestion
     */

    const basePathSplit = `/Rocket/${currentPath}`.toLowerCase().split('/').filter(path => path);
    if (!pathValid) basePathSplit.pop();
    const suggestions = pathSuggestions.map((suggestion) => {
      const split = suggestion.split('/');
      const stripped = split.filter(x => !basePathSplit.includes(x.toLowerCase()));
      return stripped[0];
    });

    return Array.from(new Set(suggestions));
  }
}
