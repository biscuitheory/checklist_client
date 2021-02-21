/* eslint-disable no-shadow */
/* eslint-disable no-constant-condition */
/* eslint-disable react/no-array-index-key */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { editList } from '../../actions/lists';

import useForm from '../customedhooks/useForm';
import validate from '../validators/validateEditList';

import AddItemButton from '../buttons/AddItemButton';
import EditListModal from './EditListModal';
import Task from './Task';

const List = ({ list, editList }) => {
  const { id, name } = list;
  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const [toggle, setToggle] = useState(true);
  // const [text, setText] = useState(task.name);
  // useEffect(() => {
  //   getTasks();
  //   console.log('inside', list.id);
  // }, []);
  // console.log('kiwi', list.id);

  function toggleInput() {
    setToggle(false);
  }

  const initialState = {
    name: '' ? '' : name,
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submitEditList
  );

  async function submitEditList() {
    editList({ list_id: list.id, name: values.name });
  }

  console.log('list', list.Tasks);
  return (
    <>
      <div className="dashboard__container-lists-list">
        <div className="dashboard__container-lists-list-header">
          <h3>{list.name}</h3>
          <FontAwesomeIcon
            icon={faEllipsisH}
            nature="ellipse"
            onMouseDown={openModal}
          />
          <EditListModal ref={modalRef} listId={list.id} />
        </div>
        {list.Tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <AddItemButton text="task">task</AddItemButton>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // tasks: state.tasks.tasks,
  lists: state.lists.lists,
});

export default connect(mapStateToProps, { editList })(List);
