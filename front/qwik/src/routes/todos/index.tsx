// import { component$ } from "@builder.io/qwik";
// import {
//   type DocumentHead,
//   routeLoader$,
//   routeAction$,
//   zod$,
//   z,
//   Form,
// } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { addTodo, deleteTodo, editTodo, getTodos } from "~/api/todos";
import TodoList from "./components/TodoList";
import type { Todo } from "~/types/todos";
import Spinner from "~/components/Spinner/Spinner";
import TodoForm from "./components/TodoForm";

export const usePost = routeLoader$(async (requestEvent) => {
    try {
        const response = await getTodos();
        return response;
    } catch (error) {
        //лучше использовать middleware, чтобы обработать ошибки во всех подобных запросах но мне лень
        return { error: error.message };
    }
});

export const useAddTodo = routeAction$(
    async (data, requestEvent) => {
        return await addTodo(data.text);
    },
    zod$({
        text: z
            .string()
            .min(3, { message: "Must be 3 or more characters long" }),
    })
);

export type useAddTodoType =  ReturnType<typeof useAddTodo>

export const useEditTodo = routeAction$(
    //@ts-expect-error
    async (data: { id: string; text: string }, requestEvent) => {
        return await editTodo(data);
    }
);
export const useDeleteTodo = routeAction$(
    //@ts-expect-error
    async (data: { id: string }, requestEvent) => {
        return await deleteTodo(data.id);
    }
);

export default component$(() => {
    const todos = usePost();
    const addTodo = useAddTodo();
    const editTodo = useEditTodo();
    const deleteTodo = useDeleteTodo();

    if (todos.value.error) {
        return <h1 class="text-center m-auto">Error: {todos.value.error}</h1>;
    }

    return (
        <div class="w-1/2 mt-3 mx-auto">
            <TodoForm addTodo={addTodo} />
            <TodoList
                class="mt-3"
                todos={todos.value as Todo[]}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
            />
            {(addTodo.isRunning ||
                deleteTodo.isRunning ||
                editTodo.isRunning) && (
                <div class="absolute inset-0 flex flex-grow justify-center items-center bg-slate-600 bg-opacity-40">
                    <Spinner size="130px" color="#F87171" width="7px" />
                </div>
            )}
        </div>
    );
});

// interface ListItem {
//   text: string;
// }

// export const list: ListItem[] = [];

// export const useListLoader = routeLoader$(() => {
//   return list;
// });

// export const useAddToListAction = routeAction$(
//   (item) => {
//     list.push(item);
//     return {
//       success: true,
//     };
//   },
//   zod$({
//     text: z.string().trim().min(1),
//   }),
// );

// export default component$(() => {
//   const list = useListLoader();
//   const action = useAddToListAction();

//   return (
//     <>
//       <div class="container container-center">
//         <h1>
//           <span class="highlight">TODO</span> List
//         </h1>
//       </div>

//       <div role="presentation" class="ellipsis"></div>

//       <div class="container container-center">
//         {list.value.length === 0 ? (
//           <span>No items found</span>
//         ) : (
//           <ul>
//             {list.value.map((item, index) => (
//               <li key={`items-${index}`}>{item.text}</li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div class="container container-center">
//         <Form action={action} spaReset>
//           <input type="text" name="text" required />{" "}
//           <button type="submit" class="button-dark">
//             Add item
//           </button>
//         </Form>

//         <p>
//           PS: This little app works even when JavaScript is disabled.
//         </p>
//       </div>
//     </>
//   );
// });

// export const head: DocumentHead = {
//   title: "Qwik Todo List",
// };
