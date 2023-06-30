import { BsCalendar, BsCaretDown } from "react-icons/bs";
import { CompanyMedicalsScheduleContainer } from "../CompanyMedicals.styles";
import {
  CompanyMdeicalsBtnWitHeader,
  CompanyMedicalsBtn,
} from "../CompanyMedicalsBtn/CompanyMedicalsBtn";
import { AiOutlinePlusCircle, AiOutlineClockCircle } from "react-icons/ai";
import CompanyMedicalsSelectedItems from "../CompanyMedicalsSelectedItems/CompanyMedicalsSelectedItems";

type Props = {};

function CompanySchedule({}: Props) {
  return (
    <CompanyMedicalsScheduleContainer>
      <div className="examination">
        <h1>Set Medical Examination Schedule</h1>

        <CompanyMdeicalsBtnWitHeader header="Set Available date  for candidates to pick from: ">
          <CompanyMedicalsBtn>
            <BsCalendar size={20} />
            Select Date 1
            <BsCaretDown size={20} color="aqua" />
          </CompanyMedicalsBtn>

          <CompanyMedicalsBtn>
            <BsCalendar size={20} />
            Select Date 2
            <BsCaretDown size={20} color="aqua" />
          </CompanyMedicalsBtn>

          <AiOutlinePlusCircle cursor={"pointer"} />
        </CompanyMdeicalsBtnWitHeader>

        <CompanyMdeicalsBtnWitHeader header="Set Available Time  for candidates to pick from:">
          <CompanyMedicalsBtn>
            <BsCalendar size={20} />
            Select time for day 1
            <BsCaretDown size={20} color="aqua" />
          </CompanyMedicalsBtn>

          <CompanyMedicalsBtn>
            <BsCalendar size={20} />
            Select time for day 2
            <BsCaretDown size={20} color="aqua" />
          </CompanyMedicalsBtn>

          <AiOutlinePlusCircle cursor={"pointer"} />
        </CompanyMdeicalsBtnWitHeader>

        <CompanyMdeicalsBtnWitHeader header="Click to select from qualified candidates">
          <CompanyMedicalsBtn centered>Select Candidate</CompanyMedicalsBtn>
        </CompanyMdeicalsBtnWitHeader>

        <CompanyMdeicalsBtnWitHeader header="Select Hospital">
          <CompanyMedicalsBtn centered>
            <AiOutlinePlusCircle size={20} />
            Add Email Address
          </CompanyMedicalsBtn>
        </CompanyMdeicalsBtnWitHeader>
      </div>

      <div className="preview">
        <CompanyMdeicalsBtnWitHeader header="Set Available date for candidates to pick from:">
          <CompanyMedicalsBtn>
            <BsCalendar size={20} />
            Select Date
            <BsCaretDown size={20} color="aqua" />
          </CompanyMedicalsBtn>
        </CompanyMdeicalsBtnWitHeader>

        <CompanyMedicalsSelectedItems
          title="Dates Selected"
          data={[
            { header: "les go", subHeader: "lets go even further" },
            { header: "les go" },
            { header: "les go" },
          ]}
        />

        <CompanyMedicalsSelectedItems
          title="Dates Selected"
          data={[
            { header: "les go", subHeader: "lets go even further" },
            { header: "les go" },
            { header: "les go" },
          ]}
        />

        <CompanyMdeicalsBtnWitHeader header="Set Available Time for candidates to pick from:">
          <CompanyMedicalsBtn>
            <AiOutlineClockCircle size={20} />
            Select Time
            <BsCaretDown size={20} color="aqua" />
          </CompanyMedicalsBtn>
        </CompanyMdeicalsBtnWitHeader>

        <CompanyMedicalsSelectedItems
          title="Time Selected"
          data={[
            { header: "les go", subHeader: "lets go even further" },
            { header: "les go" },
            { header: "les go" },
          ]}
        />

        <CompanyMedicalsSelectedItems
          title="Time Selected"
          data={[
            { header: "les go", subHeader: "lets go even further" },
            { header: "les go" },
            { header: "les go" },
          ]}
        />
      </div>
    </CompanyMedicalsScheduleContainer>
  );
}

export default CompanySchedule;
