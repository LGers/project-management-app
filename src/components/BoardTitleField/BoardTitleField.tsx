import * as React from 'react';
import { StyledTitleField } from './BoardTitleField.styles';
import { useEffect, useState } from 'react';
import { BoardTitleFieldProps } from './BoardTitleField.types';

export const BoardTitleField = ({ title, setField }: BoardTitleFieldProps) => {
  const [focussed, setFocussed] = useState(false);
  const [oldValue, setOldValue] = useState(title);
  const [newValue, setNewValue] = useState(title);
  useEffect(() => {
    setNewValue(title);
  }, [title]);

  const handleFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.key === 'Enter') {
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
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setFocussed(false);
      setNewValue(title);
    }
  };

  const onBlurTitleField = () => {
    if (newValue) {
      setField(newValue);
    }
    setFocussed(false);
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
      onBlur={onBlurTitleField}
      focused={focussed}
    />
  );
};
