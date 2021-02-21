/* eslint-disable no-shadow */
/* eslint-disable no-constant-condition */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { getListsTasks, editList } from '../actions/lists';
import { getTasks } from '../actions/tasks';

import useForm from '../components/customedhooks/useForm';
import validate from '../components/validators/validateEditList';

import Navbar from '../components/layout/Navbar';
import AddItemButton from '../components/buttons/AddItemButton';
import EditListModal from '../components/layout/EditListModal';
import EditTaskModal from '../components/layout/EditTaskModal';

const Dashboard = ({ getListsTasks, getTasks, auth, lists, tasks }) => {
  const [formOpen, setFormOpen] = useState(false);
  console.log('authenticated user', auth);
  console.log('tasks top', tasks);
  console.log('lists top', lists);
  // console.log('tasks', tasks);

  useEffect(() => {
    getListsTasks();
    getTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard__container">
        <h2>
          {auth.user.firstname}
          &apos;s Board
        </h2>
        <div className="dashboard__container-lists">
          {lists.map((list, i) => (
            <List key={i} list={list} />
          ))}
          <div className="dashboard__container-lists-addlist-inside">
            <AddItemButton text="list">list</AddItemButton>
          </div>
        </div>
        <div className="dashboard__container-lists-addlist-outside">
          <AddItemButton text="list">list</AddItemButton>
        </div>
      </div>
    </>
  );
};

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
    id: '' ? '' : id,
    name: '' ? '' : name,
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(
    initialState,
    validate,
    submitEditList
  );

  async function submitEditList() {
    editList(list.id, values.name);
  }

  console.log('tasks', list);
  return (
    <>
      <div className="dashboard__container-lists-list">
        <div className="dashboard__container-lists-list-header">
          {toggle ? (
            <h3 onDoubleClick={toggleInput}>{list.name}</h3>
          ) : (
            <input
              type="text"
              value={values.name || ''}
              onChange={handleChange}
              // onBlur={handleSubmit}
            />
          )}
          <FontAwesomeIcon
            icon={faEllipsisH}
            nature="ellipse"
            onMouseDown={openModal}
          />
          <EditListModal ref={modalRef} listId={list.id} />
        </div>
        {list.Tasks.map((task, i) => (
          <Task key={i} task={task} />
        ))}
        <AddItemButton text="task">task</AddItemButton>
      </div>
    </>
  );
};

const Task = (Tasks) => {
  const modalRef = useRef();
  console.log('ya quoi dans task', Tasks);

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
        <EditTaskModal ref={modalRef} />
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

export default connect(mapStateToProps, { getListsTasks, getTasks, editList })(
  Dashboard
);
