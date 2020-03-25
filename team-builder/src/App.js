import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Form from "./Components/Form";

import "./App.css";

const initialTeam = [
  {
    id: uuid(),
    name: "Ben Haus",
    email: "ben@little-haus.com",
    role: "Web Developer"
  },
  {
    id: uuid(),
    name: "Bob Heyburn",
    email: "bob@navy.mil",
    role: "Engineer"
  }
];

function App() {
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [formValues, setFormValues] = useState({
    name: "",
    role: "",
    email: ""
  });
  const [memberToEdit, setMemberToEdit] = useState('')

  const onInputChange = event => {
    const inputChanged = event.target.name;
    const newInputValue = event.target.value;

    setFormValues({
      ...formValues,
      [inputChanged]: newInputValue
    });
  };
  const onFormSubmit = event => {
    // stop the form from reloading the page on submit
    event.preventDefault();
    // let's add a new friend to the friedns array in state
    // let's make a new friend
    const newMember = {
      id: uuid(),
      name: formValues.name,
      email: formValues.email,
      role: formValues.role
    };
    setTeamMembers([...teamMembers, newMember]); 
    setFormValues({name: '', email: '', role: ''});
  };

  const editMember = event => {
    setMemberToEdit(event.target);
  }

  return (
    <div className="App">
      <Form
        onInputChange={onInputChange}
        formValues={formValues}
        onFormSubmit={onFormSubmit}
        teamMembers={teamMembers}
        memberToEdit={memberToEdit}
      />

      <h1>Team Members: </h1>
      {teamMembers.map(mem => (
        <div key={mem.id}>
          Name: {mem.name} | Email: {mem.email} | Role: {mem.role}
          <button name="edit" value={mem.name} onClick={editMember}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default App;
