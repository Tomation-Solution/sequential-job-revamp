import JobCard from "../components/JobCard/JobCard"




const JobList = ():React.ReactElement=>{

    return  (
        <div style={{'display':'flex','justifyContent':'space-between',
        'maxWidth':'1600px',
        // 'border':'1px solid red',
        'margin':'0 auto',
        'flexWrap':'wrap'
        }}>
            {[...new Array(20)].map((d,index)=>(
                <JobCard key={index}/>
            ))}
        </div>
    )
}

export default JobList