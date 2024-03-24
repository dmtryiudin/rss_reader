import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin')({
  component: () => <div>Hello /admin!</div>
})