import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'boldPathSuggestion',
  standalone: true
})
export class BoldPathSuggestionPipe implements PipeTransform {
  public transform(value: string, lookUp: string = ''): any {
    if (!value || !lookUp) return value;

    const replace = lookUp.replace(/[\-\[\]\/{}()*+?.\\^$|]/gu, '\\$&');
    const search = RegExp(replace, 'gi');

    return value.toString().replace(search, (match) => {
      return `<span class="bold">${match}</span>`;
    });
  }
}
