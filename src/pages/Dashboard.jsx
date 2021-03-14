/* eslint-disable no-shadow */
/* eslint-disable no-constant-condition */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { getLists, getListsTasks, sortItems } from '../actions/lists';
import { getTasks } from '../actions/tasks';

// import useForm from '../components/customedhooks/useForm';
// import validate from '../components/validators/validateEditList';

import List from '../components/layout/List';
import Navbar from '../components/layout/Navbar';
import AddItemButton from '../components/buttons/AddItemButton';

const Dashboard = ({
  getLists,
  getListsTasks,
  sortItems,
  getTasks,
  auth,
  onlyLists,
  lists,
  tasks,
}) => {
  // console.log('authenticated user', auth.user.id);
  // console.log('tasks from dashboard', tasks);
  // console.log('lists from dashboard', lists[0]);

  async function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    console.log('ledraggableId', draggableId);

    console.log('result jean pierre', result);

    if (!destination) {
      console.log('not dropped in droppable');
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log('dropped in the same place');
      return;
    }
    const droppableIdStart = source.droppableId;
    const droppableIdEnd = destination.droppableId;
    const droppableIndexStart = source.index;
    const droppableIndexEnd = destination.index;
    // console.log('droppableIdEnd', droppableIdEnd);

    console.log('ptit test currentList', lists[droppableIndexStart]);
    // move list
    sortItems(
      {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type,
      },
      lists
    );

    // sort(
    //   source.droppableId,
    //   destination.droppableId,
    //   source.index,
    //   destination.index,
    //   draggableId,
    //   type
    // );
  }

  useEffect(() => {
    getLists(auth.user.id);
    getListsTasks(auth.user.id);
    getTasks();
  }, []);

  return (
    <>
      <Navbar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dashboard__container">
          <h2>
            {auth.user.firstname}
            &apos;s Board
          </h2>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <>
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="dashboard__container-lists"
                >
                  {lists.map((list, index) => (
                    <List key={list.id} list={list} index={index} />
                  ))}
                  {provided.placeholder}
                  <div className="dashboard__container-lists-addlist-inside">
                    <AddItemButton text="list">list</AddItemButton>
                  </div>
                </div>
                <div className="dashboard__container-lists-addlist-outside">
                  <AddItemButton text="list">list</AddItemButton>
                </div>
              </>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

// const List = ({ list, editList }) => {
//   const { id, name } = list;
//   const modalRef = useRef();

//   const openModal = () => {
//     modalRef.current.openModal();
//   };

//   const [toggle, setToggle] = useState(true);
//   // const [text, setText] = useState(task.name);
//   // useEffect(() => {
//   //   getTasks();
//   //   console.log('inside', list.id);
//   // }, []);
//   // console.log('kiwi', list.id);

//   function toggleInput() {
//     setToggle(false);
//   }

//   const initialState = {
//     name: '' ? '' : name,
//   };

//   const { handleChange, handleSubmit, values, setValues, errors } = useForm(
//     initialState,
//     validate,
//     submitEditList
//   );

//   async function submitEditList() {
//     editList({ list_id: list.id, name: values.name });
//   }

//   console.log('list', list);
//   return (
//     <>
//       <div className="dashboard__container-lists-list">
//         <div className="dashboard__container-lists-list-header">
//           <h3>{list.name}</h3>
//           {/* {toggle ? (
//             <h3 onDoubleClick={toggleInput}>{list.name}</h3>
//           ) : (
//             <form className="edit-listname-container-form">
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={values.name || ''}
//                 onChange={handleChange}
//                 onBlur={handleSubmit}
//                 onKeyDown={handleSubmit}
//               />
//             </form>
//           )}
//           {errors.name && <p className="error">{errors.name}</p>} */}
//           <FontAwesomeIcon
//             icon={faEllipsisH}
//             nature="ellipse"
//             onMouseDown={openModal}
//           />
//           <EditListModal ref={modalRef} listId={list.id} />
//         </div>
//         {list.Tasks.map((task, i) => (
//           <Task key={i} task={task} />
//         ))}
//         <AddItemButton text="task">task</AddItemButton>
//       </div>
//     </>
//   );
// };

// const Task = (Tasks) => {
//   const modalRef = useRef();
//   console.log('ya quoi dans task', Tasks);

//   const openModal = () => {
//     modalRef.current.openModal();
//   };
//   return (
//     <div className="dashboard__container-lists-list-card">
//       <div className="dashboard__container-lists-list-card-header">
//         <h3>{Tasks.task.name}</h3>
//         <FontAwesomeIcon
//           icon={faPenNib}
//           nature="pen"
//           onClick={openModal}
//           className="dashboard__container-lists-list-card-header-edit"
//         />
//         <EditTaskModal ref={modalRef} />
//       </div>
//       <div className="dashboard__container-lists-list-card-description">
//         <p>{Tasks.task.description}</p>
//       </div>
//     </div>
//   );
// };

const mapStateToProps = (state, droppableIdStart) => ({
  auth: state.auth,
  // tasks: state.tasks.tasks,
  lists: state.lists.lists,
  onlyLists: state.lists.onlyLists,
});

export default connect(mapStateToProps, {
  getLists,
  getListsTasks,
  getTasks,
  sortItems,
})(Dashboard);
