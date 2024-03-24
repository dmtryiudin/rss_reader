import { QueryClient } from '@tanstack/react-query';
import { Auth } from '../utils/auth';

export interface IRouterContext {
  auth: Auth;
  queryClient: QueryClient;
}
