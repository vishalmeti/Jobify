import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { redirect, useOutletContext } from "react-router-dom";
import { useNavigation, Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useState } from "react";

export const action = async ({ request }) => {
  return null;
};

const Profile = () => {
  const triggerProfileUpdate = async () => {
    try {
      await customFetch.patch("/users/update-user", {
        name: nameState,
        lastName: lastNameState,
        location: locationState,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const [nameState, setName] = useState(name);
  const [lastNameState, setlastNameState] = useState(lastName);
  const [locationState, setlocationState] = useState(location);
  const placeholder = "Please type here...";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>

        <div className="form-center">

          <div className="form-row">
            <label htmlFor={name} className="form-label">
              {"name"}
            </label>
            <input
              type={"text"}
              id={"name"}
              name={"name"}
              value={nameState}
              onChange={(e) => setName(e.target.value)}
              className={"form-input"}
              placeholder={placeholder}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor={"lastName"} className="form-label">
              {"lastName"}
            </label>
            <input
              type={"text"}
              id={"lastName"}
              name={"lastName"}
              value={lastNameState}
              onChange={(e) => setlastNameState(e.target.value)}
              className={"form-input"}
              placeholder={placeholder}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor={name} className="form-label">
              {"email"}
            </label>
            <input
              type={email}
              id={"email"}
              name={"email"}
              disabled={true}
              className={"form-input disabled"}
              defaultValue={email}
              placeholder={placeholder}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor={name} className="form-label">
              {"location"}
            </label>
            <input
              type={"text"}
              id={"location"}
              name={"location"}
              value={locationState}
              onChange={(e) => setlocationState(e.target.value)}
              className={"form-input"}
              placeholder={placeholder}
              required
            />
          </div>
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
            onClick={triggerProfileUpdate}
          >
            {isSubmitting ? "submitting..." : "save changes"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
