import React from "react";
import { TakeTestContainer } from "./TakeTest.styles";

const TakeTest = () => {
  return (
    <TakeTestContainer>
      <h1>Test Questions from ABC Company</h1>
      <h5>Role: Business Developer</h5>
      <small>What to expect Next:</small>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Curabitur tempus urna at turpis condimentum lobortis. Ut commodo
        efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum
        eu nisl.
      </p>
      <p>
        To complete your application, the organization requires that youanswer
        some queations
      </p>

      <form>
        <label>
          <input type={"radio"} required name="ready" />
          <p>Yes, and I am ready</p>
        </label>

        <section>
          <button>Answer Questions</button>
        </section>
      </form>
    </TakeTestContainer>
  );
};
export default TakeTest;
