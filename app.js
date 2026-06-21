import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routeUrls from "./src/routes/master.router.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 5000
app.use('/api', routeUrls)

app.listen(PORT, () => {
console.log('Vault is on!')
});