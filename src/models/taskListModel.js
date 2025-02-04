// Lista de tarefas inicial, contendo algumas listas pré-definidas com tarefas dentro delas
let taskLists = [
    { id: '1', title: 'Estudos', tasks: [{ id: '1', title: 'Estudar Node', completed: false }] },
    { id: '2', title: 'Tarefas de casa', tasks: [] },
    { id: '3', title: 'Coisas do trabalho', tasks: [] }
]

// Exporta as funções para manipular as listas de tarefas
module.exports = {
    // Retorna todas as listas de tarefas
    getAllTaskLists: () => {
        return taskLists
    },

    // Busca uma lista de tarefas específica pelo ID
    getTaskListById: (id) => {
        return taskLists.find(list => list.id === id)
    },

    // Cria uma nova lista de tarefas
    createList: (title) => {
        const newList = {
            id: Math.floor(Math.random() * 99999999).toString(), // Gera um ID aleatório
            title: title, // Define o título da lista
            tasks: [] // Inicializa a lista sem tarefas
        }
        return newList
    },

    // Salva uma nova lista de tarefas no array principal
    saveList: (taskList) => {
        if (taskList.title === '') throw new Error('Título da lista não pode ficar vazio.') // Impede a criação de listas sem título
        taskLists.push(taskList) // Adiciona a nova lista ao array principal
    },

    // Exclui uma lista de tarefas pelo ID
    deleteList: (listId) => {
        const listIndex = taskLists.findIndex(list => list.id === listId) // Encontra o índice da lista
        taskLists.splice(listIndex, 1) // Remove a lista do array
    },

    // Adiciona uma nova tarefa a uma lista específica
    addTask: (listId, taskTitle) => {
        const newTask = {
            id: Math.floor(Math.random() * 99999999).toString(), // Gera um ID aleatório para a nova tarefa
            title: taskTitle, // Define o título da tarefa
            completed: false // Inicializa a tarefa como não concluída
        }
        taskLists.find(list => list.id === listId).tasks.push(newTask) // Adiciona a tarefa na lista correspondente
    },

    // Marca uma tarefa como concluída
    completeTask: (listId, taskId) => {
        const taskList = taskLists.find(list => list.id === listId) // Encontra a lista pelo ID
        const task = taskList.tasks.find(task => task.id === taskId) // Encontra a tarefa dentro da lista
        task.completed = true // Define a tarefa como concluída
    },

    // Desfaz a conclusão de uma tarefa
    undoTask: (listId, taskId) => {
        const taskList = taskLists.find(list => list.id === listId) // Encontra a lista pelo ID
        const task = taskList.tasks.find(task => task.id === taskId) // Encontra a tarefa dentro da lista
        task.completed = false // Define a tarefa como não concluída
    }
}
