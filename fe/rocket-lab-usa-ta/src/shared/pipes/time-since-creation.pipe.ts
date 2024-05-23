import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'timeSinceCreation',
  standalone: true
})
export class TimeSinceCreationPipe implements PipeTransform {
  public transform(date: Date): string {
    if (!date) return 'Invalid Date';

    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const secondsInYear = 31536000;
    let interval = Math.floor(seconds / (secondsInYear));
    if (interval > 1) {
      return `created ${interval} years ago`;
    }

    const secondsInMonth = 2592000;
    interval = Math.floor(seconds / secondsInMonth);
    if (interval > 1) {
      return `created ${interval} months ago`;
    }

    const secondsInDay = 86400;
    interval = Math.floor(seconds / secondsInDay);
    if (interval > 1) {
      return `created ${interval} days ago`;
    }

    const secondsInHour = 3600;
    interval = Math.floor(seconds / secondsInHour);
    if (interval > 1) {
      return `created ${interval} hours ago`;
    }

    const secondsInMinute = 60;
    interval = Math.floor(seconds / secondsInMinute);
    if (interval > 1) {
      return `created ${interval} minutes ago`;
    }
    return `created ${Math.floor(seconds)} seconds ago`;
  }
}
