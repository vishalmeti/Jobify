import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";

import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { capitalizeFirstLetter } from "../helpers/helper";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful", {
      autoClose: 1000,
      closeButton: false,
    });
    console.log(request);
    return redirect("/dashboard");
  } catch (error) {
    toast.error(capitalizeFirstLetter(error?.response?.data?.msg), {
      autoClose: 3000,
    });
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive", {
        autoClose: 1000,
        closeButton: false,
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    window.location.reload();
  };
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="email"
          name="email"
          defaultValue=""
          placeholder="Please enter your Email"
        />
        <FormRow
          type="password"
          name="password"
          defaultValue=""
          placeholder="Please enter your Password"
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <Link to="/dashboard">
          <button
            type="submit"
            onClick={loginDemoUser}
            className="btn btn-block"
          >
            Explore the app
          </button>
        </Link>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
