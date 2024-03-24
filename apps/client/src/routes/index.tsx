import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { Col, Flex, Input, List, Pagination, Row, Select } from 'antd';
import { z } from 'zod';
import { getAllArticlesOptions } from '../queryOptions/getAllArticlesOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  fromQueryToSortArticlesValue,
  fromSortToQueryArticlesValue,
} from '../utils/articlesSortingTransform';
import { useDebounceSearch } from '../hooks/useDebounceSearch';
import { formatTime } from '../utils/formatTime';

export const Route = createFileRoute('/')({
  component: Index,
  validateSearch: z.object({
    searchStr: z.string().optional(),
    isDesc: z.boolean().optional(),
    sort: z.string().optional(),
    page: z.number().catch(1),
  }).parse,
  loaderDeps: ({ search: { searchStr, isDesc, sort, page } }) => ({
    searchStr,
    isDesc,
    sort,
    page,
  }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(getAllArticlesOptions(opts.deps)),
});

export function Index() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { searchStr, isDesc, page, sort } = Route.useSearch();
  const { data: articlesQuery } = useSuspenseQuery(
    getAllArticlesOptions(Route.useLoaderDeps()),
  );

  const onSearchChange = (searchStr: string) => {
    navigate({
      search: (old) => {
        return {
          ...old,
          page: 1,
          searchStr: searchStr || undefined,
        };
      },
      replace: true,
    });
  };

  const { inputString, changeHandler } = useDebounceSearch(
    searchStr || '',
    onSearchChange,
  );

  const onSortChange = (value: string) => {
    navigate({
      search: (old) => {
        return {
          ...old,
          page: 1,
          ...fromSortToQueryArticlesValue(value),
        };
      },
      replace: true,
    });
  };

  const onChangePage = (page: number) => {
    navigate({
      search: (old) => {
        return {
          ...old,
          page,
        };
      },
      replace: true,
    });
  };

  const sortingOptions = [
    { value: 'articlesDesc', label: 'From newest article' },
    { value: 'articlesAsc', label: 'From oldest article' },
    { value: 'alphabetic', label: 'By article name' },
  ];

  return (
    <Flex vertical justify="space-between">
      <Row gutter={10}>
        <Col span={6} push={18}>
          <Select
            size="large"
            placeholder="Sorting..."
            style={{ minWidth: '100%' }}
            allowClear
            onChange={onSortChange}
            value={fromQueryToSortArticlesValue(sort, isDesc)}
            options={sortingOptions}
          />
        </Col>
        <Col span={18} pull={6}>
          <Input
            value={inputString}
            onChange={changeHandler}
            size="large"
            placeholder="Search article by title..."
          />
        </Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={articlesQuery.data}
        renderItem={({ title, id, pubDate }) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link target="_blank" to="/article" search={{ articleId: id }}>
                  {title}
                </Link>
              }
              description={formatTime(pubDate)}
            />
          </List.Item>
        )}
      />
      {articlesQuery.totalCount ? (
        <Pagination
          style={{ alignSelf: 'center' }}
          onChange={onChangePage}
          defaultCurrent={page}
          total={articlesQuery.totalCount}
        />
      ) : (
        <div />
      )}
    </Flex>
  );
}
