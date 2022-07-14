import { useState, useEffect, useRef } from "react";
import Spinner from './Spinner';

function TaskForm(props: any) {
    const [input, setInput] = useState(props.edit ? props.edit.name : '');
    const [loading, setLoading] = useState(false);

    const inputRef = useRef({} as HTMLInputElement);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        props.onSubmit({
            name: input
        });

        setInput('');
    }

    const handleChange = (e: any) => {
        setInput(e.target.value);
    }
    return (
        <>
            <form className="task-form" onSubmit={handleSubmit}>
                {(
                    <>
                        <input
                            type='text'
                            placeholder="Add task"
                            value={input} name='text'
                            className="task-input form-control"
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <button className="btn btn-primary addtask">Add</button>
                    </>
                )}
            </form>
            <>
                {loading ?
                    (<Spinner />) :
                    ('')
                }
            </>
        </>
    );
}

export default TaskForm