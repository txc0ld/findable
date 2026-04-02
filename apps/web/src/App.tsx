import { Suspense, lazy, type ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const LandingPage = lazy(() =>
  import("./pages/LandingPage").then((module) => ({
    default: module.LandingPage,
  })),
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const SignupPage = lazy(() =>
  import("./pages/SignupPage").then((module) => ({
    default: module.SignupPage,
  })),
);
const ForgotPasswordPage = lazy(() =>
  import("./pages/ForgotPasswordPage").then((module) => ({
    default: module.ForgotPasswordPage,
  })),
);
const ResetPasswordPage = lazy(() =>
  import("./pages/ResetPasswordPage").then((module) => ({
    default: module.ResetPasswordPage,
  })),
);
const PrivacyPage = lazy(() =>
  import("./pages/PrivacyPage").then((module) => ({
    default: module.PrivacyPage,
  })),
);
const ReportPage = lazy(() =>
  import("./pages/ReportPage").then((module) => ({
    default: module.ReportPage,
  })),
);
const TermsPage = lazy(() =>
  import("./pages/TermsPage").then((module) => ({
    default: module.TermsPage,
  })),
);
const DashboardLayout = lazy(() =>
  import("./components/DashboardLayout").then((module) => ({
    default: module.DashboardLayout,
  })),
);
const CompetitorsPage = lazy(() =>
  import("./pages/dashboard/CompetitorsPage").then((module) => ({
    default: module.CompetitorsPage,
  })),
);
const BillingPage = lazy(() =>
  import("./pages/dashboard/BillingPage").then((module) => ({
    default: module.BillingPage,
  })),
);
const AdminPage = lazy(() =>
  import("./pages/dashboard/AdminPage").then((module) => ({
    default: module.AdminPage,
  })),
);
const DashboardHome = lazy(() =>
  import("./pages/dashboard/DashboardHome").then((module) => ({
    default: module.DashboardHome,
  })),
);
const FeedsPage = lazy(() =>
  import("./pages/dashboard/FeedsPage").then((module) => ({
    default: module.FeedsPage,
  })),
);
const FixesPage = lazy(() =>
  import("./pages/dashboard/FixesPage").then((module) => ({
    default: module.FixesPage,
  })),
);
const IssuesPage = lazy(() =>
  import("./pages/dashboard/IssuesPage").then((module) => ({
    default: module.IssuesPage,
  })),
);
const ProductDetailPage = lazy(() =>
  import("./pages/dashboard/ProductDetailPage").then((module) => ({
    default: module.ProductDetailPage,
  })),
);
const ProductsPage = lazy(() =>
  import("./pages/dashboard/ProductsPage").then((module) => ({
    default: module.ProductsPage,
  })),
);
const SettingsPage = lazy(() =>
  import("./pages/dashboard/SettingsPage").then((module) => ({
    default: module.SettingsPage,
  })),
);

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteLoader />}>{element}</Suspense>;
}

const router = createBrowserRouter([
  { path: "/", element: withSuspense(<LandingPage />) },
  { path: "/scan/:id", element: withSuspense(<ReportPage />) },
  { path: "/login", element: withSuspense(<LoginPage />) },
  { path: "/signup", element: withSuspense(<SignupPage />) },
  { path: "/forgot-password", element: withSuspense(<ForgotPasswordPage />) },
  { path: "/reset-password", element: withSuspense(<ResetPasswordPage />) },
  { path: "/privacy", element: withSuspense(<PrivacyPage />) },
  { path: "/terms", element: withSuspense(<TermsPage />) },
  {
    path: "/dashboard",
    element: withSuspense(<DashboardLayout />),
    children: [
      { index: true, element: withSuspense(<DashboardHome />) },
      { path: "products", element: withSuspense(<ProductsPage />) },
      { path: "products/:id", element: withSuspense(<ProductDetailPage />) },
      { path: "issues", element: withSuspense(<IssuesPage />) },
      { path: "fixes", element: withSuspense(<FixesPage />) },
      { path: "feeds", element: withSuspense(<FeedsPage />) },
      { path: "competitors", element: withSuspense(<CompetitorsPage />) },
      { path: "billing", element: withSuspense(<BillingPage />) },
      { path: "admin", element: withSuspense(<AdminPage />) },
      { path: "settings", element: withSuspense(<SettingsPage />) },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

function RouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-6 text-text-secondary">
      <div className="card-glass rounded-2xl px-6 py-4 text-sm uppercase tracking-[0.18em]">
        Loading
      </div>
    </div>
  );
}
