const FormRow = ({ type, name, labelText, defaultValue = '', placeholder= 'Please type here..' }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className='form-input'
          defaultValue={defaultValue}
          placeholder={placeholder}
          required
        />
      </div>
    );
  };
  
  export default FormRow;