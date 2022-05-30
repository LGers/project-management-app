import React, { useState } from 'react';
import { AppBar, Button, Slide } from '@mui/material';
import { JustifySpaceBetween, MainHeaderWrapper } from './MainHeader.styles';
import { AlignCenter } from '../CommonComponents';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/auth/auth.slice';
import { store } from '../../redux';
import { fetchCreateBoard } from '../../redux/boards/boards.thunk';
import { CreateBoardDialog } from '../CreateBoardDialog';

export const MainHeader = ({ hide = true }: { hide?: boolean }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const editProfileHandler = (): void => {
    navigate(PATH.PROFILE);
  };

  const newBoardHandler = (): void => {
    setOpen(true);
  };

  const handleCreateNewBoard = (title: string, description: string) => {
    store.dispatch(fetchCreateBoard({ title, description }));
  };

  const logoutHandler = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('login');
    dispatch(setAuth(false));
  };

  const header = (
    <>
      <MainHeaderWrapper>
        <JustifySpaceBetween>
          <AlignCenter>
            <Button
              color="primary"
              variant="contained"
              onClick={editProfileHandler}
              sx={{ height: 45 }}
            >
              <p>{t('Edit profile')}</p>
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={newBoardHandler}
              sx={{ marginLeft: 2, height: 45 }}
            >
              <p> {t('Create new board')}</p>
            </Button>
            <LanguageSelect />
          </AlignCenter>
          <div>
            <Link to={PATH.WELCOME_PAGE} style={{ textDecoration: 'none', color: '#000' }}>
              <Button color="primary" variant="contained" sx={{ height: 45, mr: 2 }}>
                <p>{t('About us')}</p>
              </Button>
            </Link>
            <Button color="primary" variant="contained" onClick={logoutHandler} sx={{ height: 45 }}>
              <p>{t('Sign Out')}</p>
            </Button>
          </div>
        </JustifySpaceBetween>
      </MainHeaderWrapper>
      <CreateBoardDialog
        itemName={'board'}
        open={open}
        setOpen={setOpen}
        createBoard={handleCreateNewBoard}
      />
    </>
  );

  return (
    <>
      <Slide appear={false} direction="down" in={!hide}>
        <AppBar>{header}</AppBar>
      </Slide>
      <Slide appear={false} direction="down" in={hide}>
        <div>{header}</div>
      </Slide>
    </>
  );
};
