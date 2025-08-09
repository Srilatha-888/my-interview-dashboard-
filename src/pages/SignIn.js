import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { signInSchema } from '../validation/authValidation';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      dispatch(login({ email: values.email }));
      navigate('/dashboard');
    }
  });

  return (
    <div className="signin-container">
      <form onSubmit={formik.handleSubmit} className="signin-form">
        <h2>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.email && formik.errors.email ? 'error' : ''}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.password && formik.errors.password ? 'error' : ''}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error-message">{formik.errors.password}</div>
        )}

        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;