import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PicasAndFijas from "./PicasAndFijas";
import HotAndColdNumber from "./HotAndColdNumber";
import Home from "./Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";

const Root = () => (
  <div>
    <Outlet />
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="picasandfijas" element={<PicasAndFijas />}></Route>
      <Route path="hotandcold" element={<HotAndColdNumber />}></Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
