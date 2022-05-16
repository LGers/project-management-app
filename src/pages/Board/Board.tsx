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
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [showField, setShowField] = useState(false);
  const [fieldData, setFieldData] = useState('');
  useEffect(() => {
    store.dispatch(fetchBoard(id ?? ''));
  }, []);

  const onFieldBlur = () => {
    setShowField(false);
    if (fieldData) dispatch(setColumns({ id: 'unknown', title: fieldData, tasks: [], order: 999 }));
    setFieldData('');
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldData(event.target.value);
  };

  const handleFieldKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setFieldData('');
      setShowField(false);
    }
    if (event.key === 'Enter') {
      setFieldData('');
      setShowField(false);
      if (fieldData) {
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
            {showField && (
              <input
                onChange={onInputChange}
                onBlur={onFieldBlur}
                onKeyUp={handleFieldKeyUp}
                autoFocus={true}
              />
            )}
            <Button onClick={() => setShowField(true)}>{t('Add column')}</Button>
          </Box>
        </Content>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
