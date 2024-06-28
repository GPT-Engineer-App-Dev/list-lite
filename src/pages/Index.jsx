import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditTask = (task) => {
    setEditTask(task);
    setEditTaskText(task.text);
  };

  const saveEditTask = () => {
    setTasks(tasks.map((task) => (task.id === editTask.id ? { ...task, text: editTaskText } : task)));
    setEditTask(null);
    setEditTaskText("");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow"
            />
            <Button onClick={addTask}>Add</Button>
          </div>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-2 border rounded">
                <span>{task.text}</span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => startEditTask(task)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {editTask && (
        <Dialog open={editTask !== null} onOpenChange={() => setEditTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="editTask">Task</Label>
              <Textarea
                id="editTask"
                value={editTaskText}
                onChange={(e) => setEditTaskText(e.target.value)}
                className="w-full"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditTask(null)}>
                  Cancel
                </Button>
                <Button onClick={saveEditTask}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;