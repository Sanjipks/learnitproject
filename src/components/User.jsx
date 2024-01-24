import React from 'react'

export default function User(props) {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <img className="w-60" src={props.userImage} />
        <div>user id: {props.userId} </div>
        <h3>{props.user}</h3>
      </div>
    </div>
  );
}
