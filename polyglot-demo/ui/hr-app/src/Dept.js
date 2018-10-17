import React from 'react';

const Dept = (props) => (
    <div className="card" key={props.dept.departmentId} style={{ 'width': '100%', 'marginTop': '10px' }}>
        <div  className="card-body">
            <h5 className="card-title">Department Id: {props.dept.departmentId}</h5>
            <h5 className="card-subtitle mb-2 text-muted">Location: {props.dept.location.name}</h5>
            <h5 className="card-text">Manager Id: {props.dept.managerId}</h5>
            <p className="card-text">Department Name: {props.dept.departmentName}</p>
        </div>
    </div>
);
export default Dept;