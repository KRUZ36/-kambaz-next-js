"use client";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams();
  const [modules, setModules] = useState<any[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const fetch = async () => {
      const data = await client.findModulesForCourse(cid as string);
      setModules(data);
    };
    fetch();
  }, []);

  const addModule = async () => {
    const m = await client.createModuleForCourse(cid as string,
      { name: "New Module", course: cid });
    setModules([...modules, m]);
  };

  const removeModule = async (moduleId: string) => {
    await client.deleteModule(cid as string, moduleId);
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  const saveModule = async (module: any) => {
    await client.updateModule(cid as string, { ...module, editing: false });
    setModules(modules.map((m) =>
      m._id === module._id ? { ...module, editing: false } : m));
  };

  return (
    <div>
      {isFaculty && <ModulesControls addModule={addModule} />}
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing ? module.name : (
                <input className="form-control w-50 d-inline-block"
                  defaultValue={module.name}
                  onChange={(e) => setModules(modules.map((m) =>
                    m._id === module._id ? { ...m, name: e.target.value } : m))}
                  onKeyDown={(e) => { if (e.key === "Enter") saveModule(module); }} />
              )}
              {isFaculty && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={removeModule}
                  editModule={() => setModules(modules.map((m) =>
                    m._id === module._id ? { ...m, editing: true } : m))}
                />
              )}
            </div>
            {module.description && (
              <div className="p-3 ps-2 text-muted fs-6">
                {module.description}
              </div>
            )}
            {module.lessons && module.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}