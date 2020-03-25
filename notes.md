**Form Management**

[Lecture Notes](https://www.notion.so/Form-Management-dcc9a087102240aa94d657ea7a96f378)
[]()

- Wrapping an `<input>` in a `<label>` tag is important for accessability
  - alternately: you can use a `for="inputID"` in teh label instead of wrapping it around the input
- Example basic form:

  ```
      import React from "react";
      import "./App.css";

      function App() {
      return (
          <div className="App">
          <form>
              <label>
              Username:
              <input type="text" />
              </label>
          </form>
          </div>
      );
      }

      export default App;
  ```

- Use `onChange` handler to capture input values

  - Since React uses a virtualDOM, it also simulates DOM events with _synthetic events_
  - The `onChange` handler captures the event, and the `event`object stores the new data. This pathway is vital tp accesssing and using the data input from the form
  - Example using `onChange` synthetic event listener and storing/acessing the input value in `event.target.value`

    ```
       const Form = () => {
            const [inputValue, setInputValue] = useState("");

            const changeHandler = event => {
                setInputValue(event.target.value);
            };

            return (
                <div className="App">
                <form>
                    <label>
                    Favorite Ice Cream:
                    <input type="text" onChange={changeHandler} />
                    </label>
                </form>
                </div>
            );
            };

    ```

  - Another example:

    ```
        import React, { useState } from "react";
        import "./App.css";

        function App() {
        const [name, setName] = useState("");

        const handleChange = event => {
            setName(event.target.value);
        };

        return (
            <div className="App">
            {console.log(name)}
            <form>
                <label>
                Username:
                <input type="text" onChange={event => handleChange(event)} />
                </label>
            </form>
            </div>
        );
        }

        export default App;
    ```

* Submitting form data

  - Watch out for accidentally refreshing page on submit, to block this we have to take the `onSubmit` event listener off the `<button>` nad move it to the `<form>`
  - the `<form>` tag keeps track of it's children and can fire the submit function when the button is clicked
  - Example:

    ```
        import React, { useState } from "react";
        import "./App.css";

        function App() {
        const [name, setName] = useState("");

        const handleChange = event => {
            setName(event.target.value);
        };

        const handleSubmit = event => {
            event.preventDefault();
            console.log(name);
        };

        return (
            <div className="App">
            {console.log(name)}
            <form onSubmit={event => handleSubmit(event)}>
                <label>
                Username:
                <input type="text" onChange={event => handleChange(event)} />
                </label>
                <button>Submit!</button>
            </form>
            </div>
        );
        }

        export default App;

    ```

* Forms with mutltiple inputs

  - could call two handler functions, but it's not a very D.R.Y. approach
  - Use the _Spread Operator_ `...`
  - Using the spread operator allows you to copy data to new variable(vice having two variables pointing to the same data)

    - Spead operator example:

      ```
          let foo = { key: "value" };

          let bar = { ...foo };

          console.log(foo); //  {key: "value"}
          console.log(bar); //  {key: "value"}

          foo.key = "change";

          console.log(foo); //  {key: "change"}
          console.log(bar); //  {key: "value"}

      ```

  - Form example using the spread operator ot propperly log the input:

    ```
        import React, { useState } from "react";
        import "./App.css";

        function App() {
        const [user, setUser] = useState({ name: "", password: "" });

        const handleNameChange = event => {
            setUser({ ...user, name: event.target.value });
            };

        const handlePasswordChange = event => {
            setUser({ ...user, password: event.target.value });
            };
    ```


            const handleSubmit = event => {
                event.preventDefault();
                console.log(user.name);
                console.log(user.password);
            };

            return (
                <div className="App">
                {console.log(user)}
                <form onSubmit={event => handleSubmit(event)}>
                    <label>
                    Username:
                    <input type="text" onChange={event => handleNameChange(event)} />
                    </label>
                    <label>
                    Password:
                    <input type="text" onChange={event => handlePasswordChange(event)} />
                    </label>
                    <button>Submit!</button>
                </form>
                </div>
            );
            }

            export default App;
        ```

- Computed properties ang the login form
  Since the property key in objects is computerd, we can name our inputs adn reduce the number of change handlers we need to one

  ```
      import React, { useState } from "react";
      import "./App.css";

      function App() {
      const [user, setUser] = useState({ username: "", password: "" });

      const handleChange = event => {
          setUser({ ...user, [event.target.name]: event.target.value });
      };

      const handleSubmit = event => {
          event.preventDefault();
          console.log(user.username);
          console.log(user.password);
      };

      return (
          <div className="App">
          {console.log(user)}
          <form onSubmit={event => handleSubmit(event)}>
              <label>
              Username:
              <input
                  type="text"
                  name="username"
                  onChange={event => handleChange(event)}
              />
              </label>
              <label>
              Password:
              <input
                  type="text"
                  name="password"
                  onChange={event => handleChange(event)}
              />
              </label>
              <button>Submit!</button>
          </form>
          </div>
      );
      }

      export default App;

  ```

- Controlled inputs to manage form data

  - we're adding a `value=` attribute to our input field and setting it equal to someethign dynamic (i.e. not hard-coding it)
  - This way React notices the state is changing as the user types and can render the user input or in our case will repopulate the fields with empty string when the user clicks submit
  - Example:

    ```
        import React, { useState } from "react";
        import "./App.css";

        function App() {
        const [user, setUser] = useState({ username: "", password: "" });

        const handleChange = event => {
            setUser({ ...user, [event.target.name]: event.target.value });
        };

        const handleSubmit = event => {
            event.preventDefault();
            console.log(user.name);
            console.log(user.password);
            setUser({ username: '', password: '' });
        };

        return (
            <div className="App">
            {console.log(user)}
            <form onSubmit={event => handleSubmit(event)}>
                <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={event => handleChange(event)}
                />
                </label>
                <label>
                Password:
                <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={event => handleChange(event)}
                />
                </label>
                <button>Submit!</button>
            </form>
            </div>
        );
        }

        export default App;

    ```
