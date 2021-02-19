/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { getLists } from '../actions/lists';
import { getTasks } from '../actions/tasks';

import Navbar from '../components/layout/Navbar';
import AddItemButton from '../components/buttons/AddItemButton';

const Dashboard = ({ getLists, getTasks, auth, lists, tasks }) => {
  console.log('authenticated user', auth);
  console.log('tasks', tasks);
  // console.log('tasks', tasks);

  useEffect(() => {
    getLists();
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
          {/* {lists.map((list, i) => (
            <List key={i} list={list} />
          ))} */}
          {tasks.map((task, i) => (
            <List key={i} task={task} />
          ))}
        </div>
        <AddItemButton text="list">Add a new list</AddItemButton>
      </div>
    </>
  );
};

const List = ({ task }) => {
  // useEffect(() => {
  //   getTasks();
  //   console.log('inside', list.id);
  // }, []);
  // console.log('kiwi', list.id);
  console.log('tasks', task);
  return (
    <>
      <div className="dashboard__container-lists-list">
        <div className="dashboard__container-lists-list-header">
          <h3>{task.name}</h3>
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
        {task.Tasks.map((task, i) => (
          <Task key={i} task={task} />
        ))}
        <AddItemButton text="task">Add a new task</AddItemButton>
      </div>
    </>
  );
};

const Task = (Tasks) => {
  console.log('ya quoi dans task', Tasks);
  return (
    <div className="dashboard__container-lists-list-card">
      <div className="dashboard__container-lists-list-card-header">
        <h3>{Tasks.task.name}</h3>
        <FontAwesomeIcon icon={faPenNib} />
      </div>
      <div className="dashboard__container-lists-list-card-description">
        <p>{Tasks.task.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  lists: state.lists.lists,
  tasks: state.tasks.tasks,
});

export default connect(mapStateToProps, { getLists, getTasks })(Dashboard);
