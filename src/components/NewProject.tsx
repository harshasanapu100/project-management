import { useRef } from "react";
import Input from "./Input";
import { Project } from "../App";
import Modal from "./Modal";

type props = {
  onAdd: (project: Project) => void;
  onCancel: () => void;
};

const NewProject = ({ onAdd, onCancel }: props) => {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);
  const modalRef = useRef<any>();

  const handleSave = () => {
    const enteredTitle = title.current ? title.current.value : "";
    const enteredDescription = description.current
      ? description.current.value
      : "";
    const enteredDueDate = dueDate.current ? dueDate.current.value : "";

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modalRef.current.open();
      return;
    }

    const newProject: Project = {
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    };
    onAdd(newProject);
  };

  return (
    <>
      <Modal ref={modalRef} buttonCaption="close">
        <h2 className="text-xl font-bold text-stone-500 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">
          Oops ... looks like you forgtot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} type="text" label="Title" />
          <Input ref={description} label="Description" textarea />
          <Input ref={dueDate} type="date" label="Due Date" />
        </div>
      </div>
    </>
  );
};

export default NewProject;
