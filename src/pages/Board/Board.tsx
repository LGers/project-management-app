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
import { setColumn } from '../../redux/board/board.slice';
import { DragBoard } from './DragBoard/DragBoard';

export const Board = () => {
  const board = useSelector((state: RootState) => state.board.boardData);
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
    if (fieldData) dispatch(setColumn({ id: 'unknown', title: fieldData, tasks: [], order: 999 }));
    setFieldData('');
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldData(event.target.value);
  };

  const handleFieldKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event);
    if (event.key === 'Escape') {
      setFieldData('');
      setShowField(false);
    }
    if (event.key === 'Enter') {
      setFieldData('');
      setShowField(false);
      if (fieldData) {
        dispatch(
          setColumn({
            id: Math.random().toString(),
            title: event.currentTarget.value,
            tasks: [],
            order: 999,
          })
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
            <DragBoard />
            {showField && (
              <div style={{ backgroundColor: 'red' }}>
                <input
                  onChange={onInputChange}
                  onBlur={onFieldBlur}
                  onKeyUp={handleFieldKeyUp}
                  autoFocus={true}
                />
              </div>
            )}
          </Box>
          <Button onClick={() => setShowField(true)}>{t('Add column')}</Button>
        </Content>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </BodyWrapper>
  );
};
