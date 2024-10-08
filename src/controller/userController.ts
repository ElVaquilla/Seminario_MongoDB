import { UserModel } from '../models/User'
import { TodoModel } from '../models/Todo'
import mongoose from 'mongoose'

// CREATE

export const createUser = async (userData) => {
  try {
    const newUser = new UserModel(userData)
    await newUser.save()
    return { success: true, user: newUser }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// READ

export const getUsers = async () => {
  try {
    const users = await UserModel.find()
    return { success: true, users }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const getUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId)
    if (!user) throw new Error('User not found')
    return { success: true, user }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// UPDATE

export const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, { new: true })
    if (!updatedUser) throw new Error('User not found')
    return { success: true, user: updatedUser }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// DELETE

export const deleteUser = async (userId) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId)
    if (!deletedUser) throw new Error('User not found')
    return { success: true, message: 'User deleted successfully' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Agregation pipeline

export const aggregateUsersByCity = async () => {
    try {
      const result = await UserModel.aggregate([
        // Etapa 1: Filtrar usuarios por ciudades específicas (opcional)
        {
          $match: {
            'address.city': { $in: ['Gwenborough', 'Wisokyburgh'] } // Filtrar por ciudades si es necesario
          }
        },
        // Etapa 2: Agrupar por ciudad y contar el número de usuarios en cada ciudad
        {
          $group: {
            _id: '$address.city', // Agrupar por ciudad
            totalUsers: { $sum: 1 }, // Contar usuarios
            avgLat: { $avg: { $toDouble: '$address.geo.lat' } }, // Calcular promedio de latitud
            avgLng: { $avg: { $toDouble: '$address.geo.lng' } }, // Calcular promedio de longitud
          }
        },
        // Etapa 3: Ordenar por el número de usuarios en cada ciudad (de mayor a menor)
        {
          $sort: { totalUsers: -1 }
        },
        // Etapa 4: Proyectar los resultados deseados
        {
          $project: {
            _id: 0, // Excluir el campo _id
            city: '$_id', // Renombrar el campo _id a city
            totalUsers: 1,
            avgLat: 1,
            avgLng: 1
          }
        }
      ]);
      
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  