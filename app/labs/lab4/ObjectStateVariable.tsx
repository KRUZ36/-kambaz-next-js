"use client"
import { useState } from "react";

export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Peter", age: 24 });
  return (
    <div id="wd-object-state-variables">
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <input
        className="form-control mb-2"
        defaultValue={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
      />
      <input
        type="number"
        className="form-control"
        defaultValue={person.age}
        onChange={(e) => setPerson({ ...person, age: parseInt(e.target.value) })}
      />
      <hr/>
    </div>
  );
}