const  express =require('express')
const cors = require('cors')
const {connect} = require('./mongoose')
const router = require('./routes')
const app = express()
const port = 3000 || process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',router)
connect()
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error(err);
});

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
