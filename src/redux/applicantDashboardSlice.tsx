import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

// applicantDashboardSlice.tsx
export type ApplicantDashboardSliceStateType = {
    dashboardJobSummaryStatus: 'job_applied' | 'interviews_attended' | 'job_test_taken' | 'job_test_scheduled' | 'interview_scheduled' | 'job_offers' | 'summary';
}

const initialState: ApplicantDashboardSliceStateType = {
    dashboardJobSummaryStatus: 'summary'
}

const ApplicantDashboardSlice = createSlice({
    'name': 'ApplicantDashboardSlice',
    initialState,
    reducers: {
        changeApplicationDashboardState: (state, {payload}: PayloadAction<ApplicantDashboardSliceStateType['dashboardJobSummaryStatus']>) => {
            state.dashboardJobSummaryStatus = payload
        }
    }
})

export const selectApplicantDashboard = (state: RootState) => state.applicantDashboard
export const {changeApplicationDashboardState} = ApplicantDashboardSlice.actions
export default ApplicantDashboardSlice.reducer