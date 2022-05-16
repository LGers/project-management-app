import * as React from 'react';
import { StyledTitleField } from './BoardTitleField.styles';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  setField: (title: string) => void;
};

export const BoardTitleField = ({ title, setField }: Props) => {
  const [focussed, setFocussed] = useState(false);
  const [newValue, setNewValue] = useState(title);
  useEffect(() => {
    setNewValue(title);
  }, [title]);

  const handleFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
      if (!newValue) {
        setNewValue(title);
        setFocussed(false);
      } else {
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
