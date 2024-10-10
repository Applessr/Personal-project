const express = require('express');
const cors = require('cors');
const handlerError = require('./middlewares/error');
const notFoundHandler = require('./middlewares/not-found');
const authRouter = require('./routes/auth-route')
const userRouter = require('./routes/user-route')
const adminRouter = require('./routes/admin-route')
const userProgressRouter = require('./routes/userProgress-route')
const authenticate = require('./middlewares/authentication');


const app = express();
app.use(cors())

app.use(express.json()); //middlewere

app.use('/auth', authRouter)

app.use('/user',userRouter)
app.use('/user/user-progress',authenticate,userProgressRouter)

app.use('/admin',authenticate,adminRouter)


app.use(handlerError);
app.use('*', notFoundHandler);



app.listen(5000, () => console.log('Server is running on port 5000'));