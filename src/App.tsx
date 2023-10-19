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
import MedicalsScheduleInfo from "./pages/MedicalsScheduleInfo";
import InterviewManagementCompletion from "./pages/InterviewManagement";
import MedicalsListSubbmission from "./pages/MedicalsListSubbmission";
import JobList from "./pages/JobList/JobList";
import JobDetail from "./pages/JobDetail/JobDetail";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp/SignUp";

import JobQuetionInfo from "./pages/JobQuetionInfo";
import CvFilterTest from "./pages/CvFilterTest/CvFilterTest";
import JobTestPage from "./pages/JobTestPage/JobTestPage";
import JobSeekerRegisterForInterview from "./pages/JobSeekerRegisterForInterview";
import DocumentManagent from "./pages/DocumentManagent/DocumentManagent";
import Dashboard from "./pages/dashboard";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import CompanyIndexPage from "./pages/company";
import CompanyLayout from "./layout/CompanyLayout";
import CompanyMedicalsPage from "./pages/company/CompanyMedicalsPage";
import CompletionComponent from "./components/CompletionComponent/CompletionComponent";
import CompanySettingsPage from "./pages/company/CompanySettingsPage";
import ComapnySignup from "./components/Auth/SignUp/Company-Signup";
import CompanyJobTestManagementPage from "./pages/company/CompanyJobTestManagementPage";
import CompanyJobPostManagementPage from "./pages/company/CompanyJobPostManagementPage";
import CVSummary from "./pages/company/CVSummary/CVSummary";
import CompanyJobCandidateSum from "./pages/company/CompanyJobCandidateSum/CompanyJobCandidateSum";
import CompanyInterviewManagementPage from "./pages/company/CompanyInterviewManagementPage";
import CompanyCalendarPage from "./pages/company/CompanyCalendarPage";
import PanelistLayout from "./layout/PanelistLayout";
import PanelistInvitePage from "./pages/panelist/PanelistInvitePage";
import CompanyInterviewScorePage from "./pages/company/CompanyInterviewScorePage";
import CompanyInvitePage from "./pages/company/CompanyInvitePage";
import { QueryClient, QueryClientProvider } from "react-query";

import ForgotPassword, {
  ResetPassword,
} from "./components/Auth/ForgotPassword";
import CompanyDocumentManagement from "./pages/company/CompanyDocumentManagement/CompanyDocumentManagement";
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-up-company" element={<ComapnySignup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/reset-password/:uid/:token"
              element={<ResetPassword />}
            />
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              {/*ELIJAHS REUSABLE COMPONENTS || LOOK AT THEM */}
              <Route path="/test-management" element={<TestManagement />} />
              <Route
                path="/test-management/taking_test/:job_id"
                element={<JobTestPage />}
              />
              <Route path="/take-test" element={<TakeTest />} />
              <Route path="/test" element={<Tests />} />
              <Route path="/test-submitted" element={<TestSubmitted />} />
              <Route path="/medicals" element={<Medicals />} />
              <Route
                path="/medicals-invite/:id"
                element={<MedicalsInvitation />}
              />
              <Route path="/interviews" element={<InterviewManagement />} />
              <Route
                path="/register-interview/:interview_invite_id/:interview_id/"
                element={<JobSeekerRegisterForInterview />}
              />
              {/* ESPECIALLY THE JOBS COMPONENT */}
              <Route path="/jobs" element={<Jobs />} />
              <Route
                path="/job-quetion-info/:jobid"
                element={<JobQuetionInfo />}
              />
              <Route path="/document_managent" element={<DocumentManagent />} />
              {/*ELIJAHS REUSABLE COMPONENTS || LOOK AT THEM */}

              <Route path="/job_detail/:id/" element={<JobDetail />} />
              <Route path="/jobs_list" element={<JobList />} />
              <Route
                path="/filter_quetions/:job_id/"
                element={<CvFilterTest />}
              />

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
              <Route
                path="/medicals-list-subbmission"
                element={<MedicalsListSubbmission />}
              />
            </Route>

            <Route element={<CompanyLayout />}>
              <Route path="/company/dashboard" element={<CompanyIndexPage />} />
              <Route
                path="/company/medicals"
                element={<CompanyMedicalsPage />}
              />
              <Route
                path="/company/medicals/schedule-completed"
                element={
                  <CompletionComponent
                    title={"Medicals Schedule Completed"}
                    btnText={"Home"}
                    where={"/company/dashboard"}
                  />
                }
              />
              <Route
                path="/company/documentation-management"
                element={<CompanyDocumentManagement />}
              />

              <Route
                path="/company/settings"
                element={<CompanySettingsPage />}
              />
              <Route
                path="/company/job-test-management"
                element={<CompanyJobTestManagementPage />}
              />
              <Route
                path="/company/job-post-management"
                element={<CompanyJobPostManagementPage />}
              />

              <Route
                path="/company/cv-details/:id/:role"
                element={<CVSummary />}
              />

              <Route
                path="/company/job-candidate-summary/:jobId"
                element={<CompanyJobCandidateSum />}
              />

              <Route
                path="/company/job-interview-management"
                element={<CompanyInterviewManagementPage />}
              />

              <Route
                path="/company/calendar"
                element={<CompanyCalendarPage />}
              />

              <Route
                path="/company/candidate-score-obtained/:jobID/:candidateID/:filterType/:filterStatus"
                element={<CompanyInterviewScorePage />}
              />

              <Route
                path="/company/interview-rating"
                element={<CompanyInvitePage />}
              />
            </Route>

            <Route element={<PanelistLayout />}>
              <Route path="/panelist/invite" element={<PanelistInvitePage />} />

              <Route
                path="/panelist/cv-details/:id/:role"
                element={<CVSummary />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
