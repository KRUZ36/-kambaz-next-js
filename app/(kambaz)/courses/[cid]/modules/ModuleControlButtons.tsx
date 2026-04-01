import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons(
  { moduleId, deleteModule, editModule }:
  { moduleId: string, deleteModule: (id: string) => void, editModule: () => void }
) {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4" onClick={editModule} style={{ cursor: "pointer" }} />
      <IoEllipsisVertical className="fs-4" onClick={() => deleteModule(moduleId)} style={{ cursor: "pointer" }} />
    </div>
  );
}