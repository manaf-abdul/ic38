import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyparser from 'body-parser'
import connectDB from './Config/DB.js'
import Axios from 'axios'
import UserRoutes from './Routes/api/userRoutes.js'

dotenv.config()
const app=express()
connectDB()


app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.send("API IS RUNNING !!!!!! :->")
})

app.use('/user',UserRoutes)

app.get('/get',async(req,res)=>{
    const {data}=await Axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=6UTQpnRJNRwlU-XnzU3LQFhumGx9UQPStT93MHwmXmxIhRalYGP4Z2c4Rw2HWR1WeAeqMvPhyxt41TCU0Z7DvQjnSM07LOdFm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnH810grv4XdUG_LwF2eyuMa5ufkfaA__S5UK4miFUlt12chAkuCJLDM1zrPx1aiUl95iAjojgKbQq7vfscZ4onCrcFK6sgX0iw&lib=Ms-_GpD7w53h-KAzT1xgMOxu7vu5ZmFTa')
    res.send(data)
})

app.listen(process.env.PORT || 5005, console.log(`Server running in ${process.env.PORT}`))