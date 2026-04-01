"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams();
  const [modules, setModules] = useState<any[]>([]);
  const [moduleName, setModuleName] = useState("New Module");

  useEffect(() => {
    const fetch = async () => {
      const data = await client.findModulesForCourse(cid as string);
      setModules(data);
    };
    fetch();
  }, []);

  const addModule = async () => {
    const m = await client.createModuleForCourse(cid as string,
      { name: moduleName, course: cid });
    setModules([...modules, m]);
  };

  const removeModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  const saveModule = async (module: any) => {
    await client.updateModule({ ...module, editing: false });
    setModules(modules.map((m) =>
      m._id === module._id ? { ...module, editing: false } : m));
  };

  return (
    <div id="wd-modules">
      <div className="d-flex mb-3">
        <input className="form-control me-2" value={moduleName}
          onChange={(e) => setModuleName(e.target.value)} />
        <button className="btn btn-primary" id="wd-add-module"
          onClick={addModule}>+ Module</button>
      </div>
      <ul className="list-group" id="wd-modules-list">
        {modules.map((module: any) => (
          <li key={module._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              {module.editing ? (
                <input className="form-control w-50" defaultValue={module.name}
                  onChange={(e) => setModules(modules.map((m) =>
                    m._id === module._id ? { ...m, name: e.target.value } : m))}
                  onKeyDown={(e) => { if (e.key === "Enter") saveModule(module); }} />
              ) : (
                <span className="fw-bold">{module.name}</span>
              )}
              <div>
                <button className="btn btn-sm btn-warning me-1"
                  onClick={() => setModules(modules.map((m) =>
                    m._id === module._id ? { ...m, editing: true } : m))}>
                  Edit
                </button>
                {module.editing && (
                  <button className="btn btn-sm btn-success me-1"
                    onClick={() => saveModule(module)}>Save</button>
                )}
                <button className="btn btn-sm btn-danger"
                  onClick={() => removeModule(module._id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}