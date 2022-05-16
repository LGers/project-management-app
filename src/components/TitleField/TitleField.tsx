import * as React from 'react';
import { StyledTitleField } from './TitleField.styles';
import { useState } from 'react';

type Props = {
  title: string;
  setField: (title: string) => void;
};

export const TitleField = ({ title, setField }: Props) => {
  const [focussed, setFocussed] = useState(false);
  const [oldValue, setOldValue] = useState(title);
  const [newValue, setNewValue] = useState(title);

  const handleFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
      if (!newValue) {
        setNewValue(oldValue);
        setFocussed(false);
      } else {
        setOldValue(newValue);
        setNewValue(newValue);
        setFocussed(false);
        setField(newValue);
      }
    }
  };

  const onChangeTitleField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
  };

  return (
    <StyledTitleField
      value={newValue}
      onChange={onChangeTitleField}
      onKeyDown={handleFieldKeyDown}
      onFocus={() => setFocussed(true)}
      size={'small'}
      multiline
      onBlur={() => setFocussed(false)}
      focused={focussed}
    />
  );
};
