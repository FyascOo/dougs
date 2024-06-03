import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeCategory',
  standalone: true,
  pure: true,
})
export class CategoryActivePipe implements PipeTransform {
  transform(id: number, selectedCategoryId: number) {
    return id === selectedCategoryId;
  }
}
