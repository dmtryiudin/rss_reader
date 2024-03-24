import {
  Link,
  createFileRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { ChangeEvent, useState } from 'react';
import { RichInputDialog } from '../components';
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  List,
  Pagination,
  Popconfirm,
  Row,
  Select,
  notification,
} from 'antd';
import { z } from 'zod';
import { getAllArticlesOptions } from '../queryOptions/getAllArticlesOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useDebounceSearch } from '../hooks/useDebounceSearch';
import {
  fromQueryToSortArticlesValue,
  fromSortToQueryArticlesValue,
} from '../utils/articlesSortingTransform';
import { formatTime } from '../utils/formatTime';
import { useCreateArticleMutation } from '../queryOptions/useCreateArticleMutation';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AxiosError } from 'axios';
import { useEditArticleMutation } from '../queryOptions/useEditArticleMutation';
import { useDeleteArticleMutation } from '../queryOptions/useDeleteArticleMutation';

export const Route = createFileRoute('/admin/')({
  component: AdminPage,
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
  beforeLoad: ({ context }) => {
    if (context.auth.status === 'loggedOut') {
      throw redirect({
        to: '/admin/auth',
      });
    }
  },
});

function AdminPage() {
  const [editorValue, setEditorValue] = useState<string>('');
  const [titleValue, setTitleValue] = useState<string>('');
  const [chooseId, setChooseId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onChooseEdit = (id: string, title: string, content: string) => {
    setChooseId(id);
    setTitleValue(title);
    setEditorValue(content);
    setIsModalOpen(true);
  };

  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const setEditorValueHandler = (_: unknown, editor: ClassicEditor) => {
    const data = editor.getData();
    setEditorValue(data);
  };

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

  const { logout, token } = Route.useRouteContext({
    select: ({ auth }) => ({
      logout: auth.logout,
      token: auth.user?.token,
    }),
  });

  const errorAdminCallback = (error: AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statusCode = (error?.response?.data as any)?.statusCode;

    if (statusCode === 401) {
      logout();
      navigate({ to: '/admin/auth', search: { isSessionError: true } });
    } else {
      //Calling default error component
      throw new Error();
    }
  };

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

  const showModal = () => {
    setTitleValue('');
    setEditorValue('');
    setChooseId('');
    setIsModalOpen(true);
    form.resetFields();
  };

  const createSuccess = () => {
    notification.success({
      message: 'Successfully created',
      description: 'Article was successfully created',
    });
  };

  const editSuccess = () => {
    notification.success({
      message: 'Successfully updated',
      description: 'Article was successfully updated',
    });
  };

  const deleteSuccess = () => {
    notification.success({
      message: 'Successfully deleted',
      description: 'Article was successfully deleted',
    });
  };

  const createArticleMutation = useCreateArticleMutation(
    createSuccess,
    errorAdminCallback,
  );
  const editArticleMutation = useEditArticleMutation(
    editSuccess,
    errorAdminCallback,
  );
  const deleteArticleMutation = useDeleteArticleMutation(
    deleteSuccess,
    errorAdminCallback,
  );

  const handleOk = () => {
    form.validateFields().then(() => {
      if (chooseId) {
        editArticleMutation.mutate({
          title: titleValue,
          content: editorValue,
          id: chooseId,
          token,
        });
      } else {
        createArticleMutation.mutate({
          title: titleValue,
          content: editorValue,
          token,
        });
      }
      setIsModalOpen(false);
    });
  };

  const deleteArticleHandler = (id: string) => {
    deleteArticleMutation.mutate({ id, token });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sortingOptions = [
    { value: 'articlesDesc', label: 'From newest article' },
    { value: 'articlesAsc', label: 'From oldest article' },
    { value: 'alphabetic', label: 'By article name' },
  ];

  return (
    <>
      <Flex vertical justify="space-between">
        <Row gutter={10}>
          <Col span={6} push={18}>
            <Flex gap={10}>
              <Button size="large" onClick={showModal}>
                Add new article
              </Button>
              <Select
                size="large"
                placeholder="Sorting..."
                style={{ flex: 1 }}
                allowClear
                onChange={onSortChange}
                value={fromQueryToSortArticlesValue(sort, isDesc)}
                options={sortingOptions}
              />
            </Flex>
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
          renderItem={({ title, id, pubDate, content }) => (
            <List.Item
              actions={[
                <Button
                  onClick={() => onChooseEdit(id, title, content)}
                  type="link"
                >
                  Edit
                </Button>,
                <Popconfirm
                  title="Delete the article"
                  description="Are you sure to delete this article?"
                  okText="Yes"
                  onConfirm={() => deleteArticleHandler(id)}
                >
                  <Button type="link">Delete</Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Link
                    target="_blank"
                    to="/article"
                    search={{ articleId: id }}
                  >
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
      <RichInputDialog
        setRichInputValue={setEditorValueHandler}
        richInputValue={editorValue}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title={titleValue}
        setTitle={setTitleHandler}
        form={form}
      />
    </>
  );
}
