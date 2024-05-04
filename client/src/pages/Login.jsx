import  Logo  from '../components/Logo';
import  FormRow  from '../components/FormRow';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    console.log(request)
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' defaultValue='' placeholder='Please enter your Email' />
        <FormRow type='password' name='password' defaultValue='' placeholder='Please enter your Password' />
        <button type='submit' className='btn btn-block'disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        {/* <button type='button' className='btn btn-block'>
          explore the app
        </button> */}
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;