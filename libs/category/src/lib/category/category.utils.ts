import { Category, Group } from './category.model';

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
