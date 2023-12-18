import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

// CompanyDashboardSlice.tsx
export type CompanyDashboardSliceStateType = {
    dashboardJobSummaryStatus: 'total_application' | 'applicants_hired' | 'total_number_of_job_post' | 'closed_jobs' | 'total_number_of_cv' | 'active_jobs';
}

const initialState: CompanyDashboardSliceStateType = {
    dashboardJobSummaryStatus: 'total_application'
}

const CompanyDashboardSlice = createSlice({
    'name': 'CompanyDashboardSlice',
    initialState,
    reducers: {
        changeApplicationDashboardState: (state, {payload}: PayloadAction<CompanyDashboardSliceStateType['dashboardJobSummaryStatus']>) => {
            state.dashboardJobSummaryStatus = payload
        }
    }
})

export const selectCompanyDashboard = (state: RootState) => state.CompanyDashboard
export const {changeApplicationDashboardState} = CompanyDashboardSlice.actions
export default CompanyDashboardSlice.reducer