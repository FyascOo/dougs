import { Category, Filter, Group, GroupedCategories } from './category.model';

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

export const filterCategories = (categories: Category[], filter: Filter) => {
  return categories.filter(category => {
    const hasSelectedGroupId = filter.groupId ? category.group?.id === filter.groupId : true;
    return hasSelectedGroupId && category.wording.toLowerCase().includes(filter.categoryWording.toLocaleLowerCase());
  });
};
