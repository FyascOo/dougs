import { CategoryActivePipe } from './category-active.pipe';

describe('CategoryActivePipe', () => {
  it('transform in true', () => {
    const categoryActivePipe = new CategoryActivePipe();

    expect(categoryActivePipe.transform(0, 0)).toBeTruthy();
  });

  it('transform in false', () => {
    const categoryActivePipe = new CategoryActivePipe();

    expect(categoryActivePipe.transform(0, 1)).toBeFalsy();
  });
});
