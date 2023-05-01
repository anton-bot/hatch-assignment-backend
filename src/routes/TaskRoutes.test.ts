import MockOrm from "../repos/MockOrm";
import TaskRoutes from "./TaskRoutes";
import { Request, Response } from "express";

describe("Task API", () => {
  it("should return empty list of tasks", async () => {
    const { req, res } = createEmptyRequest();
    await TaskRoutes.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        active: [],
        done: [],
      },
    });
  });

  it("should create a task", async () => {
    const label = `New task ${Date.now()}`;
    const { req, res } = createTaskRequest(label);
    await TaskRoutes.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
        label,
        done: false,
        timestamp: expect.any(Number),
      },
    });
  });

  it("should return one task now", async () => {
    const { req, res } = createEmptyRequest();
    await TaskRoutes.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    const data = (res.json as jest.Mock).mock.calls[0][0].data;
    expect(data.active.length).toBe(1);
    expect(data.done.length).toBe(0);
  });

  it("should create a few more tasks", async () => {
    for (let i = 0; i < 5; i++) {
      const label = `New task ${Date.now()} ${i}`;
      const { req, res } = createTaskRequest(label);
      await TaskRoutes.create(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    }
  });

  let taskId: string;
  it("should return all 6 tasks now", async () => {
    const { req, res } = createEmptyRequest();
    await TaskRoutes.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    const data = (res.json as jest.Mock).mock.calls[0][0].data;
    expect(data.active.length).toBe(6);
    expect(data.done.length).toBe(0);
    taskId = data.active[3].id;
  });

  it("should mark a task as done", async () => {
    const { req, res } = createTaskCompletionRequest(taskId, true);
    await TaskRoutes.markDone(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
        label: expect.any(String),
        done: true,
        timestamp: expect.any(Number),
      },
    });
  });

  it("should return 5 active and 1 done tasks now", async () => {
    const { req, res } = createEmptyRequest();
    await TaskRoutes.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    const data = (res.json as jest.Mock).mock.calls[0][0].data;
    expect(data.active.length).toBe(5);
    expect(data.done.length).toBe(1);
    expect(data.done[0].id).toBe(taskId);
  });

  it("should mark a task as not done", async () => {
    const { req, res } = createTaskCompletionRequest(taskId, false);
    await TaskRoutes.markDone(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
        label: expect.any(String),
        done: false,
        timestamp: expect.any(Number),
      },
    });
  });

  it("should return 6 active and 0 done tasks now", async () => {
    const { req, res } = createEmptyRequest();
    await TaskRoutes.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    const data = (res.json as jest.Mock).mock.calls[0][0].data;
    expect(data.active.length).toBe(6);
    expect(data.done.length).toBe(0);
  });

  it("should delete all tasks", async () => {
    const { req, res } = createEmptyRequest();
    await TaskRoutes.deleteAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.end).toHaveBeenCalledTimes(1);
  });

  it("should return empty list of tasks", async () => {
    const { req, res } = createEmptyRequest();
    await TaskRoutes.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        active: [],
        done: [],
      },
    });
  });

  afterAll(async () => {
    await MockOrm.saveDb({ tasks: [] });
  });
});

function createTaskCompletionRequest(id: string, done: boolean) {
  const req = {
    params: { id },
    body: { done },
  } as unknown as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  return { req, res };
}

function createTaskRequest(label: string) {
  const req = {
    body: {
      task: {
        label,
      },
    },
  } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  return { req, res };
}

function createEmptyRequest() {
  const req = {
    query: {},
  } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    end: jest.fn(),
  } as unknown as Response;
  return { req, res };
}
