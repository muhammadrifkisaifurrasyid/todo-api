export class TodoListService {
  todoList = ["rifki", "saifur", "rasyid"];
  eror = [];

  getJsonTodoList() {
    return JSON.stringify({
      code: 200,
      status: "OK",
      data: this.todoList.map((value, index) => {
        return {
          id: index,
          todo: value,
        }
      }),
      eror: this.eror
    });
  }

  getTodoList(request, response) {
    this.eror.shift()
    response.write(this.getJsonTodoList());
    response.end();
  }

  createTodo(request, response) {
    request.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      this.todoList.push(body.todo);
      response.write(this.getJsonTodoList());
      response.end();
    });
  }

  updateTodo(request, response) {
    request.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      if (this.todoList[body.id]) {
        this.eror.shift()
        this.todoList[body.id] = body.todo;
      } else if (!this.todoList[body.id]) {
        this.eror.push("data tidak ditemukan")
      }

      response.write(this.getJsonTodoList());
      response.end();
    });
  }

  deleteTodo(request, response) {
    request.addListener("data", (data) => {
        const body = JSON.parse(data.toString());
        if (this.todoList[body.id]) {
            this.eror.shift()
            this.todoList.splice(body.id, 1)
        } else if (!this.todoList[body.id]) {
          this.eror.push("data tidak ditemukan")
        }
  
        response.write(this.getJsonTodoList());
        response.end();
      });
  }

}
