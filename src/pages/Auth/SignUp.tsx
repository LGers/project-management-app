import * as React from 'react';
import { SIGNUP_FORM_FIELDS } from './Auth.dictionary';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignUpFormInputs } from './Auth.types';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { RootState, store } from '../../redux/store';
import { fetchSignUp } from '../../redux/auth/auth.thunk';
import { BodyWrapper, FooterWrapper, Wrapper } from '../../components/CommonComponents';
import { AuthContent, AuthForm } from './Auth.styles';

export const SignUp = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpFormInputs>({
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    store.dispatch(
      fetchSignUp({ name: data.userName, login: data.userLogin, password: data.password })
    );
  };

  useEffect(() => {
    if (auth.isAuth) navigate(PATH.HOME);
  }, [isSubmitSuccessful]);

  const signupFields1 = SIGNUP_FORM_FIELDS.map((field) => {
    const { id, name, placeholder, type } = field;
    return (
      <div key={id}>
        <input placeholder={placeholder} type={type} {...register(name, { required: true })} />
        {errors[name] && <span>This field is required</span>}
      </div>
    );
  });
  const signUpFields = SIGNUP_FORM_FIELDS.map((field) => {
    const { id, name, placeholder, type } = field;
    return (
      <TextField
        key={id}
        placeholder={placeholder}
        type={type}
        size="small"
        label={(errors[name] && 'This field is required') || placeholder}
        fullWidth
        {...register(name, { required: true })}
      />
    );
  });

  return (
    <BodyWrapper>
      <Wrapper>
        <AuthContent>
          <h4>Lemasello</h4>
          <AuthForm onSubmit={handleSubmit(onSubmit)}>
            <strong>Sign Up to Lemasello</strong>
            {signUpFields}
            <Button variant="contained" type="submit" color="success" sx={{ width: '100%' }}>
              Sign Up
            </Button>
          </AuthForm>
        </AuthContent>
        <FooterWrapper>Footer</FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
