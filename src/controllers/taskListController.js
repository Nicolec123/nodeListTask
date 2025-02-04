// Importa o modelo 'taskListModel', que gerencia as listas de tarefas no banco de dados ou na memória
const taskListModel = require('../models/taskListModel')

module.exports = {
  // Rota GET /app - Lista todas as listas de tarefas e renderiza a página principal
  index: (req, res) => {
    const taskLists = taskListModel.getAllTaskLists(); // Obtém todas as listas de tarefas
    res.render('app', { taskLists }) // Renderiza a página 'app.ejs', passando as listas para exibição
  },

  // Rota GET /app/nova-lista - Exibe o formulário para criar uma nova lista de tarefas
  create: (req, res) => {
    res.render('create.ejs') // Renderiza a página 'create.ejs' para o usuário adicionar uma nova lista
  },

  // Rota POST /app/nova-lista - Cria uma nova lista de tarefas e a salva
  save: (req, res) => {
    const { title } = req.body // Obtém o título da nova lista enviado pelo formulário

    const newList = taskListModel.createList(title) // Cria uma nova lista com o título fornecido
    taskListModel.saveList(newList) // Salva a nova lista no banco de dados ou na memória

    res.redirect('/app') // Redireciona o usuário para a página principal após salvar a lista
  },

  // Rota GET /app/:id - Exibe uma lista específica pelo ID
  show: (req, res) => {
    const { id } = req.params // Obtém o ID da lista a partir da URL
    if (!id) throw new Error('Lista de tarefas não encontrada!') // Se o ID não existir, lança um erro
    const taskList = taskListModel.getTaskListById(id) // Obtém a lista de tarefas pelo ID
    res.render('show', { taskList }) // Renderiza a página 'show.ejs' com os detalhes da lista
  },

  // Rota POST /app/:id/excluir - Exclui uma lista de tarefas
  delete: (req, res) => {
    const { id } = req.params // Obtém o ID da lista a ser excluída
    taskListModel.deleteList(id) // Exclui a lista do banco de dados ou da memória
    res.redirect('/app') // Redireciona para a página principal após a exclusão
  },

  // Rota POST /app/:id/nova-tarefa - Adiciona uma nova tarefa a uma lista específica
  addTask: (req, res) => {
    const { id } = req.params // Obtém o ID da lista onde a tarefa será adicionada
    const { title } = req.body // Obtém o título da nova tarefa

    taskListModel.addTask(id, title) // Adiciona a tarefa à lista correspondente

    res.redirect(`/app/${id}`) // Redireciona para a página da lista após adicionar a tarefa
  },

  // Rota POST /app/:listId/completar/:taskId - Marca uma tarefa como concluída
  completeTask: (req, res) => {
    const { listId, taskId } = req.params // Obtém os IDs da lista e da tarefa

    taskListModel.completeTask(listId, taskId) // Marca a tarefa como concluída

    res.redirect(`/app/${listId}`) // Redireciona para a página da lista após a alteração
  },

  // Rota POST /app/:listId/desfazer/:taskId - Desfaz a conclusão de uma tarefa
  undoTask: (req, res) => {
    const { listId, taskId } = req.params // Obtém os IDs da lista e da tarefa

    taskListModel.undoTask(listId, taskId) // Desfaz a conclusão da tarefa

    res.redirect(`/app/${listId}`) // Redireciona para a página da lista após a alteração
  }
}
