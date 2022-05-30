import * as React from 'react';
import { LOGIN_FORM_FIELDS, SIGNUP_FORM_FIELDS } from './Auth.dictionary';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Field, FormNameInterface, FormNameType, SignUpFormInputs, FormData } from './Auth.types';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { RootState, store } from '../../redux/store';
import { fetchLogin, fetchSignUp } from '../../redux/auth/auth.thunk';
import { AuthContent, AuthForm } from './Auth.styles';
import { BodyWrapper, FooterWrapper, Wrapper } from '../../components/CommonComponents';
import { AuthAlert } from './AuthComponents/AuthAlert';
import { resetIsSignUp } from '../../redux/auth/auth.slice';
import { signInValidationSchema, signUpValidationSchema } from './Auth.validation';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../../components/LanguageSelect/LanguageSelect';
import LoadingButton from '@mui/lab/LoadingButton';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import { Footer } from '../../components/Footer';

export const Auth = ({ formName }: FormNameInterface) => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    shouldUnregister: true,
    resolver: yupResolver(formName === 'signIn' ? signInValidationSchema : signUpValidationSchema),
  });

  const setFormFields = (fields: Array<Field>): JSX.Element[] => {
    return fields.map((field) => {
      const { id, name, placeholder, type } = field;
      return (
        <TextField
          key={id}
          placeholder={t(placeholder)}
          type={type}
          size="small"
          label={(errors[name] && errors[name]?.message) || t(placeholder)}
          fullWidth
          {...register(name)}
        />
      );
    });
  };

  const setFormData = (formName: FormNameType) => {
    const formData = {
      name: 'Sign In',
      fields: [] as JSX.Element[],
    };
    switch (formName) {
      case 'signIn':
        formData.name = 'Sign In';
        formData.fields = setFormFields(LOGIN_FORM_FIELDS);
        return formData;
      case 'signUp':
        formData.name = 'Sign Up';
        formData.fields = setFormFields(SIGNUP_FORM_FIELDS);
        return formData;
      default:
        return formData;
    }
  };

  const formData = setFormData(formName) as FormData;

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    switch (formName) {
      case 'signIn':
        store.dispatch(fetchLogin({ login: data.userLogin, password: data.password }));
        break;
      default: /*sign up*/
        store.dispatch(
          fetchSignUp({ name: data.userName, login: data.userLogin, password: data.password })
        );
    }
  };

  useEffect(() => {
    if (auth.isAuth || auth.isSignUp) {
      dispatch(resetIsSignUp());
      navigate(PATH.HOME);
    }
  }, [auth.isAuth, auth.isSignUp]);

  return (
    <BodyWrapper>
      <Wrapper>
        <WelcomePageHeader />
        <AuthContent>
          <h4>Lemasello</h4>
          <AuthForm onSubmit={handleSubmit(onSubmit)}>
            <strong>{t(formData.name + ' to')} Lemasello</strong>
            {formData.fields}
            <LoadingButton
              type="submit"
              loading={auth.isFetching}
              loadingPosition="end"
              variant="contained"
              color="success"
              sx={{ width: '100%' }}
            >
              {t(formData.name)}
            </LoadingButton>
          </AuthForm>
          <LanguageSelect />
          <AuthAlert />
        </AuthContent>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
