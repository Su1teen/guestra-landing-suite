import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DemoModalProvider } from "@/components/layout/DemoModal";
import { SiteLayout } from "@/components/layout/SiteLayout";
import NotFound from "./pages/NotFound";
import { siteRoutes } from "./routes";
import { MotionConfig } from "framer-motion";

/** Маршруты без конкретного роутера: в браузере BrowserRouter, при пререндере StaticRouter. */
export const AppRoutes = () => (
  <MotionConfig reducedMotion="user">
  <DemoModalProvider>
    <Routes>
      <Route element={<SiteLayout />}>
        {siteRoutes.map((route) => <Route key={route.path} path={route.path} element={route.element} />)}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </DemoModalProvider>
  </MotionConfig>
);

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
