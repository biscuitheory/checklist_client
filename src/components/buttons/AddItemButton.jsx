import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddItemButton = ({ children }) => {
  return (
    <div className="add-item-button">
      <FontAwesomeIcon icon={faPlus} />
      <button type="button">{children}</button>
    </div>
  );
};

export default AddItemButton;
