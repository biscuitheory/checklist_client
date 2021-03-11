/* eslint-disable no-shadow */
/* eslint-disable no-constant-condition */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { getListsTasks, editList } from '../../actions/lists';

import useForm from '../customedhooks/useForm';
import validate from '../validators/validateEditList';

import AddItemButton from '../buttons/AddItemButton';
// import AddTaskButton from '../buttons/AddTaskButton';
import EditListModal from './EditListModal';
import Task from './Task';

const List = ({ auth, list, editList, getListsTasks, index }) => {
  // const [toDash, setToDash] = useState(false);
  console.log('index mystere', index);
  console.log('etetetetete', list);
  const { id, name, user_id } = list;
  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const [toggle, setToggle] = useState(true);
  // const [text, setText] = useState(list.name);
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

  const { handleChange, handleSubmit, values, errors } = useForm(
    initialState,
    validate,
    submitEditList
  );

  console.log('hoothoot', values);

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setToggle(true);
      event.preventDefault();
      event.stopPropagation();
      submitEditList();
    }
  };

  async function submitEditList() {
    editList({ list_id: id, name: values.name, user_id });
  }

  useEffect(() => {
    getListsTasks(auth.user.id);
  }, []);

  // function refreshPage() {
  //   window.location.reload();
  // }

  return (
    <>
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="dashboard__container-lists-list"
          >
            <Droppable droppableId={String(id)} type="task">
              {(provided) => (
                <>
                  <div className="dashboard__container-lists-list-header">
                    {toggle ? (
                      <h3 onDoubleClick={toggleInput}>{name}</h3>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="edit-listname-container-form"
                      >
                        <label htmlFor="name">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name || ''}
                            onChange={handleChange}
                            onBlur={handleSubmit}
                            onKeyDown={onKeyDown}
                            // onClick={() => refreshPage()}
                          />
                          {errors.name && (
                            <p className="error">{errors.name}</p>
                          )}
                        </label>
                      </form>
                    )}
                    <FontAwesomeIcon
                      icon={faEllipsisH}
                      nature="ellipse"
                      onMouseDown={openModal}
                    />
                    <EditListModal ref={modalRef} listId={id} />
                  </div>
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {list.Tasks.map((task, index) => (
                      <Task
                        key={task.id}
                        index={index}
                        id={task.id}
                        task={task}
                        list={list}
                      />
                    ))}
                    {provided.placeholder}
                    <AddItemButton text="task" listId={id} list={list}>
                      task
                    </AddItemButton>
                  </div>
                </>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // tasks: state.tasks.tasks,
  lists: state.lists.lists,
  // onlyLists: state.lists.onlyLists,
});

export default connect(mapStateToProps, { editList, getListsTasks })(List);
