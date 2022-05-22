import * as React from 'react';
import { LOGIN_FORM_FIELDS } from './Auth.dictionary';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignUpFormInputs } from './Auth.types';
import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { RootState, store } from '../../redux/store';
import { fetchLogin } from '../../redux/auth/auth.thunk';
import { AuthContent, AuthForm } from './Auth.styles';
import {
  BodyWrapper,
  FooterWrapper,
  Wrapper,
} from '../../components/CommonComponents/CommonComponents';

export const SignIn = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    store.dispatch(fetchLogin({ login: data.userLogin, password: data.password }));
  };

  useEffect(() => {
    if (auth.isAuth) navigate(PATH.HOME);
  }, [auth.isAuth]);

  const signInFields = LOGIN_FORM_FIELDS.map((field) => {
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
            <strong>Sign In to Lemasello</strong>
            {signInFields}
            <Button variant="contained" type="submit" color="success" sx={{ width: '100%' }}>
              Sign In
            </Button>
          </AuthForm>
        </AuthContent>
        <FooterWrapper>Footer</FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
