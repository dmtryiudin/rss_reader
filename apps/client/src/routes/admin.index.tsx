import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
  beforeLoad: ({ context, location }) => {
    if (context.auth.status === "loggedOut") {
      throw redirect({
        to: "/admin/auth",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function AdminPage() {
  return "feefewffefewfeefw";
}
