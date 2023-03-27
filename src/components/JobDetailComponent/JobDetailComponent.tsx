import {AiOutlineHeart} from 'react-icons/ai'
import {ImDownload2} from 'react-icons/im'
import Button from '../Button/Button'
import { JobDetailComponentContainer ,JobTitleContainer, MoreDetailInfo} from './JobDetailComponent.style'



const JobDetailComponent =():React.ReactElement=>{

    return (
        <JobDetailComponentContainer >
            {/* <Preloader loading={applying||isLoading}/> */}
            <p style={{'fontWeight':'lighter',}}><small>ABC Compant Ltd.</small></p>

            <JobTitleContainer >
                <h2 style={{'color':'black'}} >Business Developer</h2>
                
                <div>
                    <AiOutlineHeart/>
                    <ImDownload2/>
                </div>
            </JobTitleContainer>
            <p><small>VI, Lagos</small></p>

            <h3 style={{'color':'#24CDE2','padding':'1rem 0',fontWeight: 400}}>Job details</h3>
            <MoreDetailInfo>

                <div className="job_details" style={{'color':'black'}}>
                    <p>Salary</p>
                    
                    <p>{': '}$97,000/yr</p>
                </div>
                <br />
                <div className="job_details" style={{'color':'black'}}>
                    <p>JobType</p>
                    <p>{': '} Remote</p>
                </div>

            </MoreDetailInfo>
            <br />
               
            

            <h2 style={{'color':'#24CDE2','padding':'1rem 0',fontWeight: 400}}>Job Description</h2>
            <br /><br />
            <div style={{'textAlign':'left','overflow':'scroll','padding':'0 1rem','color':'black'}}>
            {/* <Editor
          text={data.replaceAll('"',' ')}
          options={{
            'disableEditing':true
          }}
        /> */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quasi quidem molestias enim, accusantium corporis, deserunt sed nihil odio perspiciatis, a assumenda ad mollitia ullam voluptatem recusandae omnis quo eveniet vel. Voluptatum doloribus facere fugiat deserunt, optio labore iusto culpa itaque. Sapiente rerum expedita, debitis dignissimos praesentium magnam est nostrum ducimus ea dolores pariatur laborum dolor deleniti similique omnis! Corporis sed alias odit voluptates earum delectus quam aliquam quidem, temporibus cumque aperiam. Voluptatibus ducimus vel facere distinctio quo minus nemo ad non hic ea accusantium quam saepe ipsam perferendis sint cupiditate, quae excepturi tempora dolorem quisquam debitis, fugit neque? Nihil.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quasi quidem molestias enim, accusantium corporis, deserunt sed nihil odio perspiciatis, a assumenda ad mollitia ullam voluptatem recusandae omnis quo eveniet vel. Voluptatum doloribus facere fugiat deserunt, optio labore iusto culpa itaque. Sapiente rerum expedita, debitis dignissimos praesentium magnam est nostrum ducimus ea dolores pariatur laborum dolor deleniti similique omnis! Corporis sed alias odit voluptates earum delectus quam aliquam quidem, temporibus cumque aperiam. Voluptatibus ducimus vel facere distinctio quo minus nemo ad non hic ea accusantium quam saepe ipsam perferendis sint cupiditate, quae excepturi tempora dolorem quisquam debitis, fugit neque? Nihil.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quasi quidem molestias enim, accusantium corporis, deserunt sed nihil odio perspiciatis, a assumenda ad mollitia ullam voluptatem recusandae omnis quo eveniet vel. Voluptatum doloribus facere fugiat deserunt, optio labore iusto culpa itaque. Sapiente rerum expedita, debitis dignissimos praesentium magnam est nostrum ducimus ea dolores pariatur laborum dolor deleniti similique omnis! Corporis sed alias odit voluptates earum delectus quam aliquam quidem, temporibus cumque aperiam. Voluptatibus ducimus vel facere distinctio quo minus nemo ad non hic ea accusantium quam saepe ipsam perferendis sint cupiditate, quae excepturi tempora dolorem quisquam debitis, fugit neque? Nihil.
            </div>
            <br /><br />
          
                <div>
                    <Button 
                    // onClick={handleJobSubbmission}
                    style={{'margin':'0 auto','width':'200px'}}
                    
                    >Apply</Button>
                </div>
            <br /><br />
              



            <br /><br />
            <br /><br />
        </JobDetailComponentContainer>
    )
}

export default JobDetailComponent