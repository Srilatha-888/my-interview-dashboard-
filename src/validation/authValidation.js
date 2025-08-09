import * as Yup from 'yup';

export const signInSchema = Yup.object({
  email: Yup.string().email('Invalid email').required(' email is Required'),
  password: Yup.string().min(6, 'Too short').required('password is Required'),
});
