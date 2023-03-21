import React, { useEffect, useState } from 'react'
import axios from "axios";
import styles from './TodoList.module.css'

const TodoList = () => {
    const [keySearch, setkeySearch] = useState('')
    const [todos, setTodos] = useState([{content: "Abcxyz", finished: false}])
    const axiosInstance = axios.create({
        baseURL: window.location.origin + ":82",
    });
    axiosInstance.defaults.headers.common = {
        ...axiosInstance.defaults.headers.common,
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    useEffect(() => {
        const getData = async () => {
            try {
                let res = await axiosInstance.get("/api/tasks");
                setTodos(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        return () => {
            getData()

        }
    }, [todos,axiosInstance])



    function addTodo() {
        let newTask = {
            content: keySearch.trim(),
        };
        axiosInstance
            .post("/api/tasks", newTask)
            .then((res) => {
                setTodos([...todos, res.data]);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    const onFinished = ($event, ele) => {
        console.log($event)
        let value = !ele.finished;
        let toDoItem = { ...ele, finished: !ele.finished };
        axiosInstance
            .put("/api/tasks", toDoItem)
            .then((res) => {
                console.log(res)
                ele.finished = value;
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
            <div className={`${styles.wrapper}`}>
                <h1>TODO LIST</h1>
                <input
                    type="text"
                    className={`${styles.inputSearch}`}
                    onChange={($event) => setkeySearch($event.target.value)}
                    placeholder="Input to do"
                    onKeyDown={($event) => $event.code === "Enter" && addTodo()}
                />
    
                {
                    todos && todos.map((todo, id) => (
                        <li key={{ id }}>
                            <input
                                type="checkbox"
                                className={`${styles.inputCheckbox}`}
                                checked={todo.finished}
                                onChange={($event) => onFinished($event, todo)} />
                            {todo.content}
                        </li>
                    ))
                }
                <p>
                    Completed to do: <b>{todos && todos.filter((todo) => todo.completed).length}</b>
                </p>
            </div>
        </>
    )
}


export default TodoList