import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faPenNib } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/layout/Navbar';
import AddItemButton from '../components/buttons/AddItemButton';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard__container">
        <h2>User&apos;s Board</h2>
        <div className="dashboard__container-lists">
          <div className="dashboard__container-lists-list">
            <div className="dashboard__container-lists-list-header">
              <h3>List title</h3>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            <div className="dashboard__container-lists-list-card">
              <div className="dashboard__container-lists-list-card-header">
                <h3>Task title</h3>
                <FontAwesomeIcon icon={faPenNib} />
              </div>
              <div className="dashboard__container-lists-list-card-description">
                <p>The task description goes in there...</p>
              </div>
            </div>
            <AddItemButton text="task">Add a new task</AddItemButton>
          </div>
          <AddItemButton text="list">Add a new list</AddItemButton>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
