import React, { useState } from 'react';
import Textarea from 'react-textarea-autosize';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const AddItemButton = ({ text, children }) => {
  const [formOpen, setFormOpen] = useState(false);

  const open = () => {
    setFormOpen(true);
  };

  const close = () => {
    setFormOpen(false);
  };

  const buttonTextOpacity = text === 'list' ? 1 : 0.5;
  const buttonTextColor = text === 'list' ? 'white' : 'inherit';
  const buttonTextBackground = text === 'list' ? '#eeeeee' : 'inherit';

  const placeholder =
    text === 'list' ? 'Enter new list name' : 'Enter new task name';

  const buttonTitle = text === 'list' ? 'Add List' : 'Add Task';

  return (
    <div
      style={{
        opacity: buttonTextOpacity,
        color: buttonTextColor,
        background: buttonTextBackground,
      }}
      className="add-item-background"
    >
      <div className="add-item-box">
        {formOpen ? (
          <div className="add-item-form">
            <Textarea
              placeholder={placeholder}
              autoFocus
              className="add-item-form-box"
              // onBlur={close}
              // value={values.listname}
            />
            <button type="submit" className="add-item-form-button">
              {buttonTitle}
            </button>
            <FontAwesomeIcon
              className="add-item-form-cross"
              icon={faTimes}
              onClick={close}
            />
          </div>
        ) : (
          <div className="add-item-button">
            <button className="add-item-buttons" type="button" onClick={open}>
              <FontAwesomeIcon icon={faPlus} />
              &nbsp; Add a new&nbsp;
              {children}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddItemButton;
