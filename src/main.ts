const mongoose = require('mongoose');

// Connection
mongoose.connect('mongodb://localhost:27017/ea-mongoose')
  .catch((error) => console.log(error));

// Madel and Interface
import { IUser, UserModel } from './models/User';
import { ITodo, TodoModel } from './models/Todo';

// One user
const user1: IUser = {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
    }
}

// Insert
const newUser= new UserModel(user1);
newUser.save()
    .then( user => {
        console.log('User Inserted ' + user._id + ' ' + user.id) 
    })
    .catch( error => {
        console.log('Error: Insert user1');
    });


// Find and Insert
UserModel.findOne({id: 1}).exec()
    .then( userFound => {
        console.log('User Found ' + userFound._id + ' ' + userFound.id)
        const newTodo = new TodoModel({id: 2, user: userFound._id, name: "Test"});
        newTodo.save()
          .then( todo => console.log(' Todo Inserted '  + todo._id + ' ' + todo.id) )
          .catch( error  => console.log(' Todo duplicated' ));
    })
    .catch((error) => {
		console.log('Error: Find and Insert');
    });


// Populate
TodoModel.findOne({id: 2}).exec()
    .then( todoFound => {
        console.log(' Todo without Populate ' + todoFound)
    })
    .catch((error) => {
      console.log('Error: Todo without Populate');
    });


TodoModel.findOne({id: 2}).populate('user').exec()
    .then( todoFound => {
        console.log(' Todo with Populate ' + todoFound)
    })
    .catch((error) => {
      console.log('Error: Todo with Populate');
    });