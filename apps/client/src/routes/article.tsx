import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { getArticleQueryOptions } from '../queryOptions/getArticleQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Article } from '../components';

export const Route = createFileRoute('/article')({
  validateSearch: z.object({
    articleId: z.string(),
  }),
  loaderDeps: ({ search: { articleId } }) => ({ articleId }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      getArticleQueryOptions(opts.deps.articleId),
    ),
  component: ArticleComponent,
});

function ArticleComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(getArticleQueryOptions(search.articleId));

  return <Article {...data} />;
}
