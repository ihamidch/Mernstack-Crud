import express from 'express';
import { usercontroller, getallusersControler,deleteusercontroller, userupdatecontroller ,getsingleusercontroller} from '../controllers/userController.js';

const userRoute = express.Router();
// http://localhost:8000/users/new
userRoute.post('/new', usercontroller);
// http://localhost:8000/users/all
userRoute.get('/all', getallusersControler);
// http://localhost:8000/users/delete
userRoute.delete('/delete/:userid', deleteusercontroller);
// http://localhost:8000/users/update
userRoute.put('/update/:userid', userupdatecontroller);
// http://localhost:8000/users/user/:userid
userRoute.get('/user/:userid', getsingleusercontroller);

export default userRoute;
