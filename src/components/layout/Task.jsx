/* eslint-disable no-shadow */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';

import EditTaskModal from './EditTaskModal';

const Task = (Tasks) => {
  const modalRef = useRef();
  console.log('ya quoi dans Tasks', Tasks);

  const openModal = () => {
    modalRef.current.openModal();
  };
  return (
    <div className="dashboard__container-lists-list-card">
      <div className="dashboard__container-lists-list-card-header">
        <h3>{Tasks.task.name}</h3>
        <FontAwesomeIcon
          icon={faPenNib}
          nature="pen"
          onClick={openModal}
          className="dashboard__container-lists-list-card-header-edit"
        />
        <EditTaskModal ref={modalRef} task={Tasks} />
      </div>
      <div className="dashboard__container-lists-list-card-description">
        <p>{Tasks.task.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // tasks: state.tasks.tasks,
  lists: state.lists.lists,
});

export default connect(mapStateToProps)(Task);
