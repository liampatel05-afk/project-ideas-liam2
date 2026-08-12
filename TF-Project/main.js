import { ApplicationRouter } from "./Main/router.js";
import { server } from "./Main/server.js";

import { homeController } from "./Main/controllers/home.js";
import { tasksController, newTaskController, createTaskController, editTaskController, updateTaskController, deleteTaskController } from "./Main/controllers/tasks.js";
import { usersController, registerFormController, registerUserController } from "./Main/controllers/users.js";
import { loginFormController, createSessionController, deleteSessionController } from "./Main/controllers/sessions.js";
import { notFoundController } from "./Main/controllers/notFound.js";

import { withHeaders } from "./Main/middleware/headers.js";
import { withLogging } from "./Main/middleware/logging.js";
import { withSession, requiresSession, excludesSession } from "./Main/middleware/auth.js";
import { validate } from "./Main/middleware/validate.js";

import { newTaskSchema } from "./Main/schema/newTask.js";
import { registerSchema, loginSchema } from "./Main/schema/user.js";

const app = new ApplicationRouter();

app.use(withLogging);
app.use(withSession);
app.use(withHeaders);

app.get("/", homeController);

app.get("/tasks", tasksController, requiresSession);
app.get("/tasks/new", newTaskController, requiresSession);
app.post("/tasks", createTaskController, requiresSession, validate(newTaskSchema));
app.get("/tasks/:taskId/edit", editTaskController, requiresSession);
app.post("/tasks/:taskId/edit", updateTaskController, requiresSession, validate(newTaskSchema));
app.post("/tasks/:taskId/delete", deleteTaskController, requiresSession);

app.get("/users", usersController);
app.get("/register", registerFormController, excludesSession);
app.post("/register", registerUserController, excludesSession, validate(registerSchema));

app.get("/login", loginFormController, excludesSession);
app.post("/sessions", createSessionController, excludesSession, validate(loginSchema));
app.post("/logout", deleteSessionController, requiresSession);

app.notFound(notFoundController);

Deno.serve((request) => server(request, app));
