import http from "http";
import {TodoListService} from "./todoList-service.mjs";

const service = new TodoListService();
const server = http.createServer((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader("Content-Type", "application/json")

    if(request.method === "GET") {
        service.getTodoList(request, response)
    }

    else if(request.method === "POST") {
        service.createTodo(request, response);
    }

    else if(request.method === "PUT") {
        service.updateTodo(request, response);
    }

    else if(request.method === "DELETE")
    service.deleteTodo(request, response);
})

server.listen(5000)