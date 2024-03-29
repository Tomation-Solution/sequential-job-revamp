import {configureStore} from '@reduxjs/toolkit';
import applicantDashboardSlice from './applicantDashboardSlice';
import companyDashboardSlice from './company/companyDashboardSlice';

export const store = configureStore({
    reducer: {
        'applicantDashboard': applicantDashboardSlice,
        'CompanyDashboard': companyDashboardSlice
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type sliceStatus = 'idle' | 'pending' | 'success' | 'error' | 'creating' | 'created' | 'updating' | 'updated' | 'deleted' | 'deleting'