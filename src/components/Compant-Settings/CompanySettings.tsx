import { useState } from "react";
import {
  AccountDetails,
  AccountDetailsSummary,
  CompanySettingsContainer,
  NavigationItems,
} from "./CompanySettings.styles";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import { RxPencil2 } from "react-icons/rx";
import { PiPencilSlashBold } from "react-icons/pi";
import Button from "../Button/Button";
import CompanyModal from "./Company-Modal/CompanyModal";

function CompanySettings() {
  const [showSubmitBtn, setSetShowSubmitBtn] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [options, setOptions] = useState<
    "my-profile" | "security" | "delete-account"
  >("my-profile");
  return (
    <>
      {showDeleteModal && (
        <CompanyModal closefn={() => setShowDeleteModal(false)} />
      )}
      <CompanySettingsContainer>
        <section className="navigation">
          <NavigationItems
            isActive={options === "my-profile"}
            onClick={() => setOptions("my-profile")}
          >
            <p>My Profile</p>
          </NavigationItems>

          <NavigationItems
            isActive={options === "security"}
            onClick={() => setOptions("security")}
          >
            <p>Security</p>
          </NavigationItems>

          <NavigationItems
            isDanger
            isActive={options === "delete-account"}
            onClick={() => {
              setOptions("delete-account");
              setShowDeleteModal(true);
            }}
          >
            <p>Delete Account</p>
          </NavigationItems>
        </section>

        {options === "my-profile" ? (
          <section className="account-info">
            <AccountDetailsSummary>
              <div className="summary">
                <img alt="" src="" />
                <div>
                  <h1>Your Name</h1>
                  <p>Company Name</p>
                  <p>Location</p>
                </div>
              </div>

              {showSubmitBtn ? (
                <PiPencilSlashBold
                  size={25}
                  onClick={() => setSetShowSubmitBtn(!showSubmitBtn)}
                />
              ) : (
                <RxPencil2
                  size={25}
                  onClick={() => setSetShowSubmitBtn(!showSubmitBtn)}
                />
              )}
            </AccountDetailsSummary>

            <AccountDetails>
              <h1>Personal Information</h1>
              <div className="halved-inputs">
                <InputWithLabel
                  disabled={!showSubmitBtn}
                  placeholder={"Company Name"}
                  label={"Company Name"}
                />
                <InputWithLabel
                  disabled={!showSubmitBtn}
                  placeholder="Email Address"
                  label={"Email Address"}
                />
                <InputWithLabel
                  disabled={!showSubmitBtn}
                  placeholder="Phone Number"
                  label={"Phone Number"}
                />
              </div>
            </AccountDetails>

            <AccountDetails>
              <h1>Address</h1>
              <div className="halved-inputs">
                <InputWithLabel
                  disabled={!showSubmitBtn}
                  placeholder="Country"
                  label={"Country"}
                />
                <InputWithLabel
                  disabled={!showSubmitBtn}
                  placeholder="City/State"
                  label={"City/State"}
                />
                <InputWithLabel
                  disabled={!showSubmitBtn}
                  placeholder="Postal Code"
                  label={"Postal Code"}
                />
                <InputWithLabel
                  disabled={!showSubmitBtn}
                  placeholder="Address Number"
                  label={"Address Number"}
                />
                <InputWithLabel
                  disabled={!showSubmitBtn}
                  placeholder="Address Street"
                  label={"Address Street"}
                />
                <InputWithLabel
                  disabled={!showSubmitBtn}
                  placeholder="Address 2"
                  label={"Address 2"}
                />
              </div>
            </AccountDetails>

            {showSubmitBtn && <Button styleType="pry">Submit</Button>}
          </section>
        ) : null}

        {options === "security" ? (
          <section className="account-info">
            <InputWithLabel
              placeholder="Change Password"
              label="Change Password"
            />
            <Button>Submit</Button>
          </section>
        ) : null}
      </CompanySettingsContainer>
    </>
  );
}

export default CompanySettings;
