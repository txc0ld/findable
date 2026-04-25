import { Suspense, lazy, type ReactNode } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { ScrollToTop } from "./components/ScrollToTop";
import { UmbrellaLayout } from "./components/layouts/UmbrellaLayout";
import { StockProofLayout } from "./components/layouts/StockProofLayout";

// Umbrella pages
const UmbrellaHomePage = lazy(() =>
  import("./pages/umbrella/UmbrellaHomePage").then((m) => ({ default: m.UmbrellaHomePage })),
);
const AboutPage = lazy(() =>
  import("./pages/umbrella/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import("./pages/umbrella/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const PrivacyPage = lazy(() =>
  import("./pages/umbrella/PrivacyPage").then((m) => ({ default: m.PrivacyPage })),
);
const TermsPage = lazy(() =>
  import("./pages/umbrella/TermsPage").then((m) => ({ default: m.TermsPage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/umbrella/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

// FindAble pages (each owns its own inline chrome until Phase 3 unifies them under FindableLayout)
const LandingPage = lazy(() =>
  import("./pages/findable/LandingPage").then((m) => ({ default: m.LandingPage })),
);
const LoginPage = lazy(() =>
  import("./pages/findable/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const SignupPage = lazy(() =>
  import("./pages/findable/SignupPage").then((m) => ({ default: m.SignupPage })),
);
const ForgotPasswordPage = lazy(() =>
  import("./pages/findable/ForgotPasswordPage").then((m) => ({
    default: m.ForgotPasswordPage,
  })),
);
const ResetPasswordPage = lazy(() =>
  import("./pages/findable/ResetPasswordPage").then((m) => ({ default: m.ResetPasswordPage })),
);
const ReportPage = lazy(() =>
  import("./pages/findable/ReportPage").then((m) => ({ default: m.ReportPage })),
);
const GlossaryPage = lazy(() =>
  import("./pages/findable/GlossaryPage").then((m) => ({ default: m.GlossaryPage })),
);
const WhatIsAeoPage = lazy(() =>
  import("./pages/findable/WhatIsAeoPage").then((m) => ({ default: m.WhatIsAeoPage })),
);
const WhatWeScanPage = lazy(() =>
  import("./pages/findable/WhatWeScanPage").then((m) => ({ default: m.WhatWeScanPage })),
);
const HowReportsWorkPage = lazy(() =>
  import("./pages/findable/HowReportsWorkPage").then((m) => ({
    default: m.HowReportsWorkPage,
  })),
);
const PricingPage = lazy(() =>
  import("./pages/findable/PricingPage").then((m) => ({ default: m.PricingPage })),
);

// FindAble dashboard
const DashboardLayout = lazy(() =>
  import("./components/DashboardLayout").then((m) => ({ default: m.DashboardLayout })),
);
const DashboardHome = lazy(() =>
  import("./pages/findable/dashboard/DashboardHome").then((m) => ({ default: m.DashboardHome })),
);
const ProductsPage = lazy(() =>
  import("./pages/findable/dashboard/ProductsPage").then((m) => ({ default: m.ProductsPage })),
);
const ProductDetailPage = lazy(() =>
  import("./pages/findable/dashboard/ProductDetailPage").then((m) => ({
    default: m.ProductDetailPage,
  })),
);
const IssuesPage = lazy(() =>
  import("./pages/findable/dashboard/IssuesPage").then((m) => ({ default: m.IssuesPage })),
);
const FixesPage = lazy(() =>
  import("./pages/findable/dashboard/FixesPage").then((m) => ({ default: m.FixesPage })),
);
const FeedsPage = lazy(() =>
  import("./pages/findable/dashboard/FeedsPage").then((m) => ({ default: m.FeedsPage })),
);
const CompetitorsPage = lazy(() =>
  import("./pages/findable/dashboard/CompetitorsPage").then((m) => ({
    default: m.CompetitorsPage,
  })),
);
const BillingPage = lazy(() =>
  import("./pages/findable/dashboard/BillingPage").then((m) => ({ default: m.BillingPage })),
);
const AdminPage = lazy(() =>
  import("./pages/findable/dashboard/AdminPage").then((m) => ({ default: m.AdminPage })),
);
const SettingsPage = lazy(() =>
  import("./pages/findable/dashboard/SettingsPage").then((m) => ({ default: m.SettingsPage })),
);

// StockProof pages
const StockProofLandingPage = lazy(() =>
  import("./pages/stockproof/StockProofLandingPage").then((m) => ({
    default: m.StockProofLandingPage,
  })),
);
const StockProofPricingPage = lazy(() =>
  import("./pages/stockproof/StockProofPricingPage").then((m) => ({
    default: m.StockProofPricingPage,
  })),
);
const HowReceivingWorksPage = lazy(() =>
  import("./pages/stockproof/HowReceivingWorksPage").then((m) => ({
    default: m.HowReceivingWorksPage,
  })),
);
const WhyVariancesMatterPage = lazy(() =>
  import("./pages/stockproof/WhyVariancesMatterPage").then((m) => ({
    default: m.WhyVariancesMatterPage,
  })),
);
const StockProofFaqPage = lazy(() =>
  import("./pages/stockproof/StockProofFaqPage").then((m) => ({ default: m.StockProofFaqPage })),
);

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteLoader />}>{element}</Suspense>;
}

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <UmbrellaLayout />,
        children: [
          { path: "/", element: withSuspense(<UmbrellaHomePage />) },
          { path: "/about", element: withSuspense(<AboutPage />) },
          { path: "/contact", element: withSuspense(<ContactPage />) },
          { path: "/privacy", element: withSuspense(<PrivacyPage />) },
          { path: "/terms", element: withSuspense(<TermsPage />) },
          { path: "*", element: withSuspense(<NotFoundPage />) },
        ],
      },
      { path: "/findable", element: withSuspense(<LandingPage />) },
      { path: "/findable/glossary", element: withSuspense(<GlossaryPage />) },
      { path: "/findable/what-is-aeo", element: withSuspense(<WhatIsAeoPage />) },
      { path: "/findable/what-we-scan", element: withSuspense(<WhatWeScanPage />) },
      { path: "/findable/how-reports-work", element: withSuspense(<HowReportsWorkPage />) },
      { path: "/findable/pricing", element: withSuspense(<PricingPage />) },
      { path: "/findable/scan/:id", element: withSuspense(<ReportPage />) },
      { path: "/findable/login", element: withSuspense(<LoginPage />) },
      { path: "/findable/signup", element: withSuspense(<SignupPage />) },
      { path: "/findable/forgot-password", element: withSuspense(<ForgotPasswordPage />) },
      { path: "/findable/reset-password", element: withSuspense(<ResetPasswordPage />) },
      {
        path: "/findable/dashboard",
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
      {
        element: <StockProofLayout />,
        children: [
          { path: "/stockproof", element: withSuspense(<StockProofLandingPage />) },
          { path: "/stockproof/pricing", element: withSuspense(<StockProofPricingPage />) },
          {
            path: "/stockproof/how-receiving-works",
            element: withSuspense(<HowReceivingWorksPage />),
          },
          {
            path: "/stockproof/why-variances-matter",
            element: withSuspense(<WhyVariancesMatterPage />),
          },
          { path: "/stockproof/faq", element: withSuspense(<StockProofFaqPage />) },
        ],
      },
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
