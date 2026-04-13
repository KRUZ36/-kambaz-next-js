import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash, FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons(
  { moduleId, deleteModule, editModule }:
  { moduleId: string, deleteModule: (id: string) => void, editModule: () => void }
) {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4" style={{ cursor: "pointer" }} />
      <FaPencil className="fs-5 me-2" onClick={editModule}
        style={{ cursor: "pointer" }} />
      <FaTrash className="fs-5 me-2" onClick={(e) => {
        e.stopPropagation();
        deleteModule(moduleId);
      }} style={{ cursor: "pointer" }} />
      <IoEllipsisVertical className="fs-4" style={{ cursor: "pointer" }} />
    </div>
  );
}