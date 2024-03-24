export const fromQueryToSortArticlesValue = (
  sort?: string,
  isDesc?: boolean,
) => {
  if (sort === 'pubDate' && isDesc) {
    return 'articlesDesc';
  }

  if (sort === 'pubDate' && !isDesc) {
    return 'articlesAsc';
  }

  if (sort === 'title' && !isDesc) {
    return 'alphabetic';
  }

  return null;
};

export const fromSortToQueryArticlesValue = (sort: string) => {
  switch (sort) {
    case 'articlesDesc':
      return { sort: 'pubDate', isDesc: true };
    case 'articlesAsc':
      return { sort: 'pubDate', isDesc: false };
    case 'alphabetic':
      return { sort: 'title', isDesc: false };
    default:
      return { sort: undefined, isDesc: undefined };
  }
};
