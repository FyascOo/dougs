import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CategoryRepository } from '../category.repository';
import {
  mapFilterCategories,
  mapFilterGroupedCategories,
  mapUniqueGroups,
  mapVisibleCategories,
} from '../category.utils';
import { CATEGORIES_MOCK, VISIBLE_CATEGORY } from './categories.mock';
import { CategoryStore } from './category.store';

describe('CategoryStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryStore,
        {
          provide: CategoryRepository,
          useValue: { getCategories: () => of(CATEGORIES_MOCK), getVisibleCategories: () => of([{ id: 1 }]) },
        },
      ],
    });
  });
  it('should create initial state', () => {
    const store = TestBed.inject(CategoryStore);
    expect(store.categories.length).toBe(0);
  });

  it('should create categories', () => {
    const categories = mapVisibleCategories(CATEGORIES_MOCK, VISIBLE_CATEGORY);

    expect(categories.length).toBe(66);
  });

  it('should create unique group', () => {
    const categories = mapUniqueGroups(CATEGORIES_MOCK);

    expect(categories.length).toBe(10);
  });

  it('should create filterCategories without filter', () => {
    const categories = mapFilterCategories(CATEGORIES_MOCK, { categoryWording: '', groupId: 0 });

    expect(categories.length).toBe(200);
  });

  it('should create filterCategories with filter categoryWording', () => {
    const categories = mapFilterCategories(CATEGORIES_MOCK, { categoryWording: 'so', groupId: 0 });
    expect(categories.length).toBe(15);
  });

  it('should create filterCategories with filter groupId', () => {
    const categories = mapFilterCategories(CATEGORIES_MOCK, { categoryWording: '', groupId: 5 });

    expect(categories.length).toBe(18);
  });

  it('should create filterCategories with filter categoryWording and groupdId', () => {
    const categories = mapFilterCategories(CATEGORIES_MOCK, { categoryWording: 'so', groupId: 5 });

    expect(categories.length).toBe(7);
  });

  it('should create filterGroupedCategories without filter', () => {
    const group = mapUniqueGroups(CATEGORIES_MOCK);
    const groupedCategories = mapFilterGroupedCategories(CATEGORIES_MOCK, group, { categoryWording: '', groupId: 0 });

    expect(groupedCategories.length).toBe(10);
  });
  it('should create filterGroupedCategories with categoryWording', () => {
    const group = mapUniqueGroups(CATEGORIES_MOCK);
    const groupedCategories = mapFilterGroupedCategories(CATEGORIES_MOCK, group, { categoryWording: 'so', groupId: 0 });

    expect(groupedCategories.length).toBe(6);
  });
  it('should create filterGroupedCategories with groupId', () => {
    const group = mapUniqueGroups(CATEGORIES_MOCK);
    const groupedCategories = mapFilterGroupedCategories(CATEGORIES_MOCK, group, { categoryWording: '', groupId: 5 });

    expect(groupedCategories.length).toBe(1);
  });
  it('should create filterGroupedCategories with categoryWording and groupId', () => {
    const group = mapUniqueGroups(CATEGORIES_MOCK);
    const groupedCategories = mapFilterGroupedCategories(CATEGORIES_MOCK, group, { categoryWording: 'so', groupId: 5 });

    expect(groupedCategories.length).toBe(1);
    expect(groupedCategories.at(0)?.categories.length).toBe(18);
  });
});
