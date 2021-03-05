/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { deleteList } from '../actions/lists';

const EditListModal = ({ deleteList, listId }) => {
  console.log('tatayuyu', listId);

  // const history = useHistory();

  async function submit() {
    // deleteList(listId, history);
    deleteList(listId);
  }

  return (
    <>
      <div className="editlist-modal-box">
        <FontAwesomeIcon icon={faTrashAlt} />
        <p>Do you really want to delete the list?</p>
        <button type="submit" className="delete-item-button" onClick={submit}>
          Delete the list
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists.lists,
});

export default connect(mapStateToProps, { deleteList })(EditListModal);
