import { Route } from "react-router";
import { Routes, BrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import MainLayout from "./layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestManagement from "./components/TestManagement/TestManagement";
import TakeTest from "./components/TestManagement/TakeTest/TakeTest";
import Tests from "./components/TestManagement/Tests/Tests";
import TestSubmitted from "./components/TestManagement/TestSubmitted/TestSubmitted";
import Medicals from "./components/Medicals/Medicals";
import MedicalsInvitation from "./components/Medicals/MedicalsInvitation/MedicalsInvitation";
import InterviewManagement from "./components/InterviewManagement/InterviewManagement";
import Jobs from "./pages/Jobs";
import CVManagement from "./pages/CVManagement/CVManagement";
import Button from "./components/Button/Button";
import MedicalsScheduleInfo from "./pages/MedicalsScheduleInfo";
import InterviewManagementCompletion from "./pages/InterviewManagement";
import MedicalsListSubbmission from "./pages/MedicalsListSubbmission";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import Dashboard from "./pages/Dashboard";
// import AuthRoutes from "./components/Auth/AuthRoutes";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            {/*ELIJAHS REUSABLE COMPONENTS || LOOK AT THEM */}
            <Route path="/test-management" element={<TestManagement />} />
            <Route path="/take-test" element={<TakeTest />} />
            <Route path="/test" element={<Tests />} />
            <Route path="/test-submitted" element={<TestSubmitted />} />
            <Route path="/medicals" element={<Medicals />} />
            <Route path="/medicals-invite" element={<MedicalsInvitation />} />
            <Route path="/interviews" element={<InterviewManagement />} />
            {/* ESPECIALLY THE JOBS COMPONENT */}
            <Route path="/jobs" element={<Jobs />} />
            {/*ELIJAHS REUSABLE COMPONENTS || LOOK AT THEM */}

            <Route path="/job_detail" element={<JobDetail />} />
            <Route path="/jobs_list" element={<JobList />} />
            <Route path="/cvmanagement" element={<CVManagement />} />

            {/* ADD OTHER PATHS THAT SHOULD BE RENDERED WITH THE SIDEBAR HERE, ELSE DO SO OUTSIDE */}
            <Route
              path="/medicals-scheduleinfo"
              element={<MedicalsScheduleInfo />}
            />
            <Route
              path="/interview-completion"
              element={<InterviewManagementCompletion />}
            />
            <Route
              path="/medicals-list-subbmission"
              element={<MedicalsListSubbmission />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
