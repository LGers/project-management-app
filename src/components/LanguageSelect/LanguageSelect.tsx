import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Languages, setLanguage } from '../../redux/auth/auth.slice';
import { RootState } from '../../redux/store';

export const LanguageSelect = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.auth.language);
  const { t, i18n } = useTranslation();
  const handleChange = (event: SelectChangeEvent) => {
    localStorage.setItem('language', event.target.value);
    i18n.changeLanguage(event.target.value);
    dispatch(setLanguage(event.target.value as Languages));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 85 }} size="small">
      <InputLabel id="language-select-label">{t('languageLabel')}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={language}
        label={t('languageLabel')}
        onChange={handleChange}
      >
        <MenuItem value={'en'}>EN</MenuItem>
        <MenuItem value={'ru'}>RU</MenuItem>
      </Select>
    </FormControl>
  );
};
