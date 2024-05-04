import Logo  from '../components/Logo';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import FormRow from '../components/FormRow';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { capitalizeFirstLetter } from '../helpers/helper';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data)
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful',{
      autoClose:1000, 
      closeButton: false,
    });
    return redirect('/login');
  } catch (error) {
    toast.error(capitalizeFirstLetter(error?.response?.data?.msg),{
      autoClose: 3000, 
    });
    return error;
  }
};

// export const action = async (data)=>{
//   console.log(data)
//   return null
// }

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' labelText='first name' placeholder='Please enter your first name'/>
        <FormRow type='text' name='lastName' labelText='last name' placeholder='Please enter your last name'/>
        <FormRow type='text' name='location' placeholder='Please enter where you are from' />
        <FormRow type='email' name='email' placeholder='Please enter your email' />

        <FormRow type='password' name='password' placeholder='Please choose your password '/>

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;