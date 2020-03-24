import React from 'react';


export default function Form (props) {

    return (
      <form onSubmit={props.onFormSubmit}>
        <label for="name">Name: </label>
        <input
          name="name"
          type="text"
          value={props.formValues.name}
          onChange={props.onInputChange}
        />
        <br />
        <label for="email">Email: </label>
        <input
          name="email"
          type="text"
          value={props.formValues.email}
          onChange={props.onInputChange}
        />
        <br />
        <label for="role">Role: </label>
        <input
          name="role"
          type="text"
          value={props.formValues.role}
          onChange={props.onInputChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

    
    );
}