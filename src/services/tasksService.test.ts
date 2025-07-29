import { getTasks } from "./tasksService";

describe("tasksService", () => {
  beforeAll(() => {
    (window as any).api = {
      getTasks: jest.fn().mockResolvedValue([
        {
          id: "1",
          title: "Task 1",
          description: "Description for Task 1",
          taskDate: "2025-07-28T00:00:00.000Z", 
          level: "low",
          completed: false,
        },
        {
          id: "2",
          title: "Task 2",
          description: "Description for Task 2",
          taskDate: "2025-07-29T00:00:00.000Z",
          level: "high",
          completed: true,
        },
      ]),
    };
  });

  afterAll(() => {
    delete (window as any).api;
  });

  it("should fetch all tasks", async () => {
    const tasks = await getTasks();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe("Task 1");
    expect(tasks[1].completed).toBe(true);
  });

  it("should throw an error if api.getTasks fails", async () => {
    (window as any).api.getTasks.mockRejectedValueOnce(new Error("API failure"));
    await expect(getTasks()).rejects.toThrow("API failure");
  });
});
