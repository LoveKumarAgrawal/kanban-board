import toast from "react-hot-toast";
import Button from "./Button";

const Modal = ({
    closeModal,
    title,
    action,
    value,
    isCreate,
    isEdit,
    isDelete
}: {
    closeModal: () => void;
    title: string;
    action: (formData: FormData) => Promise<void>;
    value: string;
    isCreate?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
}) => {

    const submitHandler = () => {
        if (isCreate) {
          toast.success("New Task Created");
        } else if (isEdit) {
          toast.success("Task Has Been Updated");
        } else if (isDelete) {
          toast.success("Tak has been deleted");
        }
        closeModal();
      };

    return (
        <div
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
            onClick={closeModal}
        >
            <div
                className="bg-gray-700 rounded-lg p-6 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="flex justify-center">
                    <form action={action} onSubmit={submitHandler}>
                        <input
                            type="hidden"
                            name="taskId"
                            value={value}
                        />
                        {isEdit && (
                            <input
                                type="text"
                                name="newTask"
                                placeholder="Enter new task name"
                                className="h-20 bg-transparent border-b text-3xl self-center focus:outline-none w-full"
                            />
                        )}
                        {isCreate && (
                            <>
                                <input
                                    type="text"
                                    name="task"
                                    placeholder="Enter task name"
                                    className="h-20 bg-transparent border-b text-3xl self-center focus:outline-none w-full"
                                />
                                <input
                                    type="hidden"
                                    value={value}
                                    name="boardId"
                                />
                            </>
                        )}

                        <div className="mt-5 flex gap-5">
                            <Button
                                confirmButton
                                text="Confirm"
                                type="submit"
                            />
                            <Button text="Cancel" onClick={closeModal} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal