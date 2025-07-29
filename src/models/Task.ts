export interface Task{
    id: string;
    title: string;
    description?: string;
    taskDate: Date;
    level: 'low' | 'medium' | 'high';
    completed: boolean;
}