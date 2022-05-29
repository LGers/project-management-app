import React, { useState } from 'react';
import { WelcomePageHeader } from '../../components/WelcomePageHeader';
import {
  BodyWrapper,
  FooterWrapper,
  Wrapper,
} from '../../components/CommonComponents/CommonComponents';
import { Footer } from '../../components/Footer';
// import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { MainHeader } from '../../components/MainHeader';
import { AuthContent, AuthForm } from '../Auth/Auth.styles';
import { Box, Button, Dialog, TextField } from '@mui/material';
import { SIGNUP_FORM_FIELDS } from '../Auth/Auth.dictionary';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormInputs } from '../Auth/Auth.types';
// import { fetchSignUp, fetchUser } from '../../redux/auth/auth.thunk';
// import { getUserById } from '../../api/users';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

export const EditProfilePage = () => {
  // const { t } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const tempState = useSelector((state: RootState) => state);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDel, setOpenDel] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpFormInputs>({
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    console.log(data);
    // dispatch(setAuth(true)); //todo after confirm in slice
    // store.dispatch(
    //   fetchSignUp({ name: data.userName, login: data.userLogin, password: data.password })
    // );
  };

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

  const testClick = () => {
    console.log('testClick');
    console.log('store:', store);
    console.log('tempState:', tempState);
  };

  const onDelTask = () => {
    console.log('delete user');
  };

  const handlerEditProfile = () => {
    setOpenEdit(true);
    console.log('edit profile');
  };

  const handlerDeleteUser = () => {
    setOpenDel(true);
    console.log('delete user');
  };

  return (
    <BodyWrapper>
      <Wrapper>
        {isAuth ? <MainHeader /> : <WelcomePageHeader />}
        <Box sx={{ margin: '18px 18px 0px 18px' }}>
          <>Edit Profile Page of user {userId}</>
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
              Edit User Profile
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="error"
              onClick={handlerDeleteUser}
              sx={{ margin: '18px 18px 0px 18px' }}
            >
              Delete User
            </Button>
          </Box>
        </Box>
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <AuthContent>
            <AuthForm onSubmit={handleSubmit(onSubmit)}>
              <strong>Edit Your profile</strong>
              {signUpFields}
              <Button variant="contained" type="submit" color="success" sx={{ width: '100%' }}>
                Confirm Change
              </Button>
            </AuthForm>
          </AuthContent>
        </Dialog>
        <ConfirmationDialog
          open={openDel}
          setOpen={setOpenDel}
          itemName={'user'}
          itemTitle={userId}
          deleteItem={onDelTask}
        />
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
