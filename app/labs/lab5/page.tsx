"use client";
import Link from "next/link";
import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";
import HttpClient from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <ul className="nav nav-pills mb-3">
        <li className="nav-item"><Link className="nav-link" href="/labs/lab1">Lab 1</Link></li>
        <li className="nav-item"><Link className="nav-link" href="/labs/lab2">Lab 2</Link></li>
        <li className="nav-item"><Link className="nav-link" href="/labs/lab3">Lab 3</Link></li>
        <li className="nav-item"><Link className="nav-link" href="/labs/lab4">Lab 4</Link></li>
        <li className="nav-item"><Link className="nav-link active" href="/labs/lab5">Lab 5</Link></li>
      </ul>
      <div className="list-group mb-3">
        <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">Welcome</a>
      </div>
      <hr/>
      <EnvironmentVariables />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <WorkingWithArrays />
      <HttpClient />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}