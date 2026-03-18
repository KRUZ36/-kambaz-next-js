"use client"
import Link from "next/link";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4">
      <h2>Lab 4</h2>
      <ul className="nav nav-pills mb-3">
        <li className="nav-item"><Link className="nav-link" href="/labs/lab1">Lab 1</Link></li>
        <li className="nav-item"><Link className="nav-link" href="/labs/lab2">Lab 2</Link></li>
        <li className="nav-item"><Link className="nav-link" href="/labs/lab3">Lab 3</Link></li>
        <li className="nav-item"><Link className="nav-link active" href="/labs/lab4">Lab 4</Link></li>
      </ul>
      <hr/>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <hr/>
      <Link href="/labs/lab4/redux">Redux Examples</Link>
      <hr/>
      <Link href="/labs/lab4/url-encoding">URL Encoding</Link>
      <hr/>
      <Link href="/labs/lab4/react-context">React Context Examples</Link>
      <hr/>
      <Link href="/labs/lab4/zustand">Zustand Examples</Link>
    </div>
  );
}