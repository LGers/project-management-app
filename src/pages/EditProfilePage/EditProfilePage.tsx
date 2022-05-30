import React, { useEffect, useState } from 'react';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import { BodyWrapper, FooterWrapper, Wrapper } from '../../components/CommonComponents';
import { Footer } from '../../components/Footer';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { MainHeader } from '../../components/MainHeader';
import { AuthContent, AuthForm } from '../Auth/Auth.styles';
import { Box, Button, Dialog, TextField } from '@mui/material';
import { SIGNUP_FORM_FIELDS } from '../Auth/Auth.dictionary';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormInputs } from '../Auth/Auth.types';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import jwt_decode from 'jwt-decode';
import { TokenData } from '../../redux/auth/auth.types';
import { fetchDeleteUser, fetchUpdateUser } from '../../redux/auth/auth.thunk';

export type User = {
  id: string;
  name: string;
  login: string;
};

export const EditProfilePage = () => {
  const { t } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDel, setOpenDel] = useState<boolean>(false);
  const token = localStorage.getItem('authToken') ?? '';
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpFormInputs>({
    shouldUnregister: true,
    defaultValues: {
      userName: '',
      confirmPassword: '',
      password: '',
      userLogin: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    const { userLogin, userName, password } = data;
    const name = userName;
    const login = userLogin;
    store.dispatch(fetchUpdateUser({ userId, name, login, password }));
  };

  const signUpFields = SIGNUP_FORM_FIELDS.map((field) => {
    const { id, name, placeholder, type } = field;
    return (
      <TextField
        key={id}
        placeholder={t(placeholder)}
        type={type}
        size="small"
        label={(errors[name] && t('This field is required')) || t(placeholder)}
        fullWidth
        {...register(name, { required: true })}
      />
    );
  });

  const testClick = () => {
    // console.log('testClick');
    // console.log('store:', store);
    // console.log('tempState:', tempState);
  };

  const onDelTask = () => {
    store.dispatch(fetchDeleteUser({ userId: (jwt_decode(token) as TokenData).userId }));
  };

  const handlerEditProfile = () => {
    setOpenEdit(true);
  };

  const handlerDeleteUser = () => {
    setOpenDel(true);
  };

  return (
    <BodyWrapper>
      <Wrapper>
        {isAuth ? <MainHeader /> : <WelcomePageHeader />}
        <Box sx={{ margin: '18px 18px 0px 18px' }}>
          <>{t('Edit Profile Page of user')}</>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              variant="contained"
              type="submit"
              color="success"
              onClick={handlerEditProfile}
              sx={{ margin: '18px 18px 0px 18px' }}
            >
              {t('Edit User Profile')}
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="error"
              onClick={handlerDeleteUser}
              sx={{ margin: '18px 18px 0px 18px' }}
            >
              {t('Delete User')}
            </Button>
          </Box>
        </Box>
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <AuthContent>
            <AuthForm onSubmit={handleSubmit(onSubmit)}>
              <strong>{t('Edit Your profile')}</strong>
              {signUpFields}
              <Button variant="contained" type="submit" color="success" sx={{ width: '100%' }}>
                {t('Confirm Change')}
              </Button>
            </AuthForm>
          </AuthContent>
        </Dialog>
        <ConfirmationDialog
          open={openDel}
          setOpen={setOpenDel}
          itemName={'user'}
          itemTitle={(jwt_decode(token) as TokenData).login}
          deleteItem={onDelTask}
        />
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
