import inquirer from 'inquirer';

interface Task {
    id: number;
    description: string;
    completed: boolean;
}

let taskIdCounter = 1;
const tasks: Task[] = [];

async function addTask(): Promise<void> {
    const taskDescription = await inquirer.prompt({
        name: 'description',
        type: 'input',
        message: 'Enter task description:',
    });

    const newTask: Task = {
        id: taskIdCounter++,
        description: taskDescription.description,
        completed: false,
    };

    tasks.push(newTask);
    console.log(`Task added: ${newTask.description}`);
}

async function viewTasks(): Promise<void> {
    console.log('\nCurrent Tasks:');
    tasks.forEach((task) => {
        const status = task.completed ? 'Completed' : 'Not Completed';
        console.log(`- [${status}] ${task.description} (ID: ${task.id})`);
    });
}

async function markTaskComplete(): Promise<void> {
    const taskToComplete = await inquirer.prompt({
        name: 'taskId',
        type: 'input',
        message: 'Enter the ID of the task to mark as complete:',
    });

    const taskId = parseInt(taskToComplete.taskId, 10);
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
        task.completed = true;
        console.log(`Task marked as complete: ${task.description}`);
    } else {
        console.log('Task not found.');
    }
}

const menuOptions = [
    { name: 'Add Task', value: 'addTask' },
    { name: 'View Tasks', value: 'viewTasks' },
    { name: 'Mark Task as Complete', value: 'markTaskComplete' },
    { name: 'Quit', value: 'quit' },
];

async function main(): Promise<void> {
    let shouldQuit = false;

    while (!shouldQuit) {
        const selectedOption = await inquirer.prompt({
            name: 'option',
            type: 'list',
            message: 'Choose an option:',
            choices: menuOptions,
        });

        switch (selectedOption.option) {
            case 'addTask':
                await addTask();
                break;
            case 'viewTasks':
                await viewTasks();
                break;
            case 'markTaskComplete':
                await markTaskComplete();
                break;
            case 'quit':
                shouldQuit = true;
                break;
            default:
                console.log('Invalid option');
                break;
        }
    }

    console.log('Goodbye!');
}

main();
