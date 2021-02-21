/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { deleteList } from '../actions/lists';

const EditListModal = ({ deleteList, listId }) => {
  console.log('these are the lists id', listId);

  const history = useHistory();

  async function submit() {
    deleteList(listId, history);
  }

  // if () {
  //   return <Redirect to="/dashboard" />;
  // }
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
  lists: state.lists,
});

export default connect(mapStateToProps, { deleteList })(EditListModal);
