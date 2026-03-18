"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Modal, FormControl } from "react-bootstrap";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" size="lg" className="me-1 float-end" onClick={handleShow}>
        <FaPlus className="me-2" /> Module
      </Button>

      <div className="dropdown d-inline me-1 float-end">
        <Button variant="secondary" size="lg" className="dropdown-toggle" data-bs-toggle="dropdown">
          <GreenCheckmark /> Publish All
        </Button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item"><GreenCheckmark /> Publish All</button></li>
          <li><button className="dropdown-item"><GreenCheckmark /> Publish all modules and items</button></li>
          <li><button className="dropdown-item"><GreenCheckmark /> Publish modules only</button></li>
          <li><hr className="dropdown-divider" /></li>
          <li><button className="dropdown-item">Unpublish all modules and items</button></li>
          <li><button className="dropdown-item">Unpublish modules only</button></li>
        </ul>
      </div>

      <Button variant="secondary" size="lg" className="me-1 float-end">
        View Progress
      </Button>

      <Button variant="secondary" size="lg" className="me-1 float-end">
        Collapse All
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            placeholder="Module Name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={() => { addModule(); handleClose(); }}>
            Add Module
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}