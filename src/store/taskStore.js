import { create } from 'zustand';
import * as Crypto from 'expo-crypto';
import { TASK_STATUS } from '../utils/constants';

// Function to generate unique IDs using expo-crypto
const generateId = () => {
  return Crypto.randomUUID();
};

const useTaskStore = create((set, get) => ({
  // State
  tasks: [],
  projects: [],
  
  // Actions
  addTask: (title, description = '') => {
    const newTask = {
      id: generateId(),
      title,
      description,
      status: TASK_STATUS.INBOX,
      context: null,
      projectId: null,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    set((state) => ({
      tasks: [...state.tasks, newTask]
    }));
  },
  
  updateTask: (taskId, updates) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    }));
  },
  
  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== taskId)
    }));
  },
  
  completeTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === taskId 
          ? { ...task, status: TASK_STATUS.COMPLETED, completedAt: new Date().toISOString() }
          : task
      )
    }));
  },
  
  addProject: (name, description = '') => {
    const newProject = {
      id: generateId(),
      name,
      description,
      createdAt: new Date().toISOString()
    };
    
    set((state) => ({
      projects: [...state.projects, newProject]
    }));
  },
  
  // Getters
  getInboxTasks: () => {
    const { tasks } = get();
    return tasks.filter(task => task.status === TASK_STATUS.INBOX);
  },
  
  getNextActions: () => {
    const { tasks } = get();
    return tasks.filter(task => task.status === TASK_STATUS.NEXT_ACTION);
  },
  
  getTasksByContext: (context) => {
    const { tasks } = get();
    return tasks.filter(task => 
      task.status === TASK_STATUS.NEXT_ACTION && task.context === context
    );
  },
  
  getTasksByProject: (projectId) => {
    const { tasks } = get();
    return tasks.filter(task => task.projectId === projectId);
  }
}));

export default useTaskStore;