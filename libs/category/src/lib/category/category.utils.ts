import { Category, Filter, Group } from './category.model';

export const mapVisibleCategories = (categories: Category[], visibleCategories: { id: number }[]) =>
  categories.filter(category => visibleCategories.some(({ id }) => category.id === id));

export const mapUniqueGroups = (categories: Category[]) => {
  const groups = categories.map(category => category.group).filter(v => !!v) as Group[];
  const uniqueGroups = groups.reduce((acc: Group[], curr: Group) => {
    if (!acc.some(a => a.id === curr.id)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return uniqueGroups;
};

export const mapFilterCategories = (categories: Category[], filter: Filter) => {
  return categories.filter(category => getFilter(filter, category));
};

export const mapFilterGroupedCategories = (categories: Category[], group: Group[], filter: Filter) => {
  return group
    .map(g => ({
      ...g,
      categories: categories.filter(category => category.group?.id === g.id),
    }))
    .filter(groupedCategory => groupedCategory.categories.some(category => getFilter(filter, category)));
};

const getFilter = (filter: Filter, category: Category) => {
  const hasSelectedGroupId = filter.groupId ? category.group?.id === filter.groupId : true;
  return hasSelectedGroupId && category.wording.toLowerCase().includes(filter.categoryWording.toLocaleLowerCase());
};
