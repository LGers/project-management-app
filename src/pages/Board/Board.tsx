import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Wrapper, Content, FooterWrapper, BodyWrapper } from '../../components/CommonComponents';
import { Footer } from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { MainHeader } from '../../components/MainHeader';
import { fetchBoard } from '../../redux/board/board.thunk';
import { useParams } from 'react-router-dom';
import { Column } from '../../components/Column';
import { setColumns } from '../../redux/board/board.slice';

export const Board = () => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [addBoard, setAddBoard] = useState(false);
  const [inputName, setInputName] = useState('');
  useEffect(() => {
    store.dispatch(fetchBoard(id ?? ''));
  }, []);

  const hideInput = () => {
    setAddBoard(false);
    if (inputName) dispatch(setColumns({ id: 'unknown', title: inputName, tasks: [], order: 999 }));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleFieldKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setInputName('');
      setAddBoard(false);
    }
    if (event.key === 'Enter') {
      setInputName('');
      setAddBoard(false);
      if (inputName) {
        dispatch(
          setColumns({ id: 'unknown', title: event.currentTarget.value, tasks: [], order: 999 })
        );
      }
      // getCardsFromApi({
      //   name: searchString,
      //   filterBy: catalog.filterBy,
      //   page: 1,
      //   catalogLimit: catalog.catalogLimit,
      // });
    }
  };

  return (
    <BodyWrapper>
      <Wrapper>
        <MainHeader />
        <Content>
          <Box sx={{ bgcolor: '#cfe8fc' }}>
            <h1>{board?.title}</h1>
          </Box>
          <Box
            sx={{
              display: 'inherit',
              height: '100%',
              p: 1,
              overflow: 'hidden',
            }}
          >
            {board?.columns.map((col) => (
              <Column key={col.id} {...col} />
            ))}
            {addBoard && (
              <input
                onChange={onInputChange}
                onBlur={hideInput}
                onKeyUp={handleFieldKeyUp}
                autoFocus={true}
              />
            )}
            <Button onClick={() => setAddBoard(true)}>{t('Add column')}</Button>
          </Box>
        </Content>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
