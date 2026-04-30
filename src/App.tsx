import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./components/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/VanDetail";
import LayoutRoute from "./pages/LayoutRoute";
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostLayout from "./pages/HostLayout";
import Hostvans, { loader as hostVansLoader } from "./pages/Host/Hostvans";
import HostvanDetail, {
  loader as hostVanDetailLoader,
} from "./pages/Host/HostvanDetail";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import HostVanInfo from "./pages/Host/HostVanInfo";
import NotFound from "./components/NotFound";
import Error from "./components/Error";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login";
import { requireAuth } from "./utils";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutRoute />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route
        path="vans"
        element={<Vans />}
        errorElement={<Error />}
        loader={vansLoader}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader}
        errorElement={<Error />}
      />
      <Route
        path="host"
        element={<HostLayout />}
        loader={({ request }) => requireAuth(request)}
      >
        <Route
          index
          element={<Dashboard />}
          loader={dashboardLoader}
          errorElement={<Error />}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="vans"
          element={<Hostvans />}
          loader={hostVansLoader}
          errorElement={<Error />}
        />
        <Route
          path="vans/:id"
          element={<HostvanDetail />}
          loader={hostVanDetailLoader}
          errorElement={<Error />}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
