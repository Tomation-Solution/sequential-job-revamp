
import React from "react"
import AttachmentIcon from "@mui/icons-material/Attachment";

import {JobsUploadCon} from '../JobsSlides/JobsSlides.styles'
const JobsUploadComponent = ():React.ReactElement=>{
    return (
        <JobsUploadCon>
        <p>Upload membership cert for both companies</p>
        <AttachmentIcon />
      </JobsUploadCon>
    )
}

export default JobsUploadComponent