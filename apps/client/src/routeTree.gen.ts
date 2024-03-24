/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ArticleImport } from './routes/article'
import { Route as IndexImport } from './routes/index'
import { Route as AdminIndexImport } from './routes/admin.index'
import { Route as AdminAuthImport } from './routes/admin.auth'

// Create/Update Routes

const ArticleRoute = ArticleImport.update({
  path: '/article',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AdminIndexRoute = AdminIndexImport.update({
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any)

const AdminAuthRoute = AdminAuthImport.update({
  path: '/admin/auth',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/article': {
      preLoaderRoute: typeof ArticleImport
      parentRoute: typeof rootRoute
    }
    '/admin/auth': {
      preLoaderRoute: typeof AdminAuthImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      preLoaderRoute: typeof AdminIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ArticleRoute,
  AdminAuthRoute,
  AdminIndexRoute,
])

/* prettier-ignore-end */
