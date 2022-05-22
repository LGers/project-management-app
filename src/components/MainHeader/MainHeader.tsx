import React, { useState } from 'react';
import { AppBar, Button, Slide } from '@mui/material';
import { JustifySpaceBetween, MainHeaderWrapper } from './MainHeader.styles';
import { AlignCenter } from '../CommonComponents';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/common.dictionary';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/auth/auth.slice';
import { store } from '../../redux';
import { fetchBoards, fetchCreateBoard } from '../../redux/boards/boards.thunk';
import { CreateItemDialog } from '../CreateItemDialog';
import { CreateBoardDialog } from '../CreateBoardDialog';
import { set } from 'react-hook-form';

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

  const handleCreateNewBoard = (title: string) => {
    store.dispatch(fetchCreateBoard({ title, description: '123' }));
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
            <Button color="primary" variant="contained" onClick={editProfileHandler}>
              <p>{t('Edit profile')}</p>
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={newBoardHandler}
              sx={{ marginLeft: 5 }}
            >
              <p> {t('Create new board')}</p>
            </Button>
            <LanguageSelect />
          </AlignCenter>
          <Button color="primary" variant="contained" onClick={logoutHandler}>
            <p>{t('Sign Out')}</p>
          </Button>
        </JustifySpaceBetween>
      </MainHeaderWrapper>
      <CreateBoardDialog
        itemName={'board'}
        open={open}
        setOpen={setOpen}
        createBoard={handleCreateNewBoard}
      />
      {/*<CreateItemDialog
        itemName={'board'}
        open={open}
        setOpen={setOpen}
        createItem={handleCreateNewBoard}
      />*/}
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
