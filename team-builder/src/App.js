import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Form from "./Components/Form";

import "./App.css";

const initialTeam = [
  { id: uuid(), name: "Ben Haus", email: "ben@little-haus.com", role: "Web Developer" }
];

function App() {
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [formValues, setFormValues] = useState({
    name: "",
    role: "",
    email: ""
  });

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
      role: formValues.lname
    };
    setTeamMembers([...teamMembers, newMember]); // WE NEED TO PASS AN ENTIRE ARRAY
    // setFriends(friends.concat(newFriend))
  };

  return (
    <div className="App">
      <Form
        onInputChange={onInputChange}
        formValues={formValues}
        onFormSubmit={onFormSubmit}
      />

      <h1>Team Members: </h1>
      {teamMembers.map(mem => (
        <div key={mem.id}>
          {mem.name} {mem.email} {mem.role}
        </div>
      ))}
    </div>
  );
}

export default App;
