import { useRef, useState } from "react";
import Modal from "./Modal";

type NewTaskProps = {
  onAdd: (task: string) => void;
};

const NewTask = ({ onAdd }: NewTaskProps) => {
  const [enteredTask, setEnteredTask] = useState("");
  const modalRef = useRef<any>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredTask(event.target.value);
  };

  const handleClick = () => {
    if (enteredTask.trim() === "") {
      modalRef.current.open();
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
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
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleChange}
          value={enteredTask}
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
    </>
  );
};

export default NewTask;
