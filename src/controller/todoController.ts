import { UserModel } from '../models/User'
import { TodoModel } from '../models/Todo'
import mongoose from 'mongoose'

// CREATE - Crear un nuevo documento

export const createTodo = async (todoData) => {
  try {
    const newTodo = new TodoModel(todoData)
    await newTodo.save()
    return { success: true, todo: newTodo }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// READ - Leer documentos (uno o varios)

export const getTodos = async () => {
  try {
    const todos = await TodoModel.find().populate('user')
    return { success: true, todos }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const getTodoById = async (todoId) => {
  try {
    const todo = await TodoModel.findById(todoId).populate('user')
    if (!todo) throw new Error('Todo not found')
    return { success: true, todo }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// UPDATE - Actualizar documentos

export const updateTodo = async (todoId, todoData) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, todoData, { new: true })
    if (!updatedTodo) throw new Error('Todo not found')
    return { success: true, todo: updatedTodo }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// DELETE - Borrar documentos

export const deleteTodo = async (todoId) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(todoId)
    if (!deletedTodo) throw new Error('Todo not found')
    return { success: true, message: 'Todo deleted successfully' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Agregation pipeline

export const getCompletedTodos = async () => {
    try {
      const todos = await TodoModel.aggregate([
        { $match: { completed: true } },
        {
          $lookup: {
            from: 'users', // La colección a unir
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $unwind: '$userDetails',
        },
        {
          $project: {
            id: 1,
            name: 1,
            completed: 1,
            user: '$userDetails.name',
          },
        },
      ]);
      return { success: true, todos };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  