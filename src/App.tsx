import { Route } from "react-router";
import { Routes, BrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import MainLayout from "./layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CVManagement from "./pages/CVManagement/CVManagement";
import Button from "./components/Button/Button";
// import AuthRoutes from "./components/Auth/AuthRoutes";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={<h1>HELLO WORLD, TYPE THIS PATH IN THE URL "/path"
                <Button  styleType="sec">Hello world</Button>

              </h1>}
            />
            <Route path="/cvmanagement" element={<CVManagement />} />
            {/* ADD OTHER PATHS THAT SHOULD BE RENDERED WITH THE SIDEBAR HERE, ELSE DO SO OUTSIDE */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
