import Logo  from '../components/Logo';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link } from 'react-router-dom';
import FormRow from '../components/FormRow';

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' labelText='first name' placeholder='Please enter your first name'/>
        <FormRow type='text' name='lastName' labelText='last name' placeholder='Please enter your last name'/>
        <FormRow type='text' name='location' placeholder='Please enter where you are from' />
        <FormRow type='email' name='email' placeholder='Please enter your email' />

        <FormRow type='password' name='password' placeholder='Please choose your password '/>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;