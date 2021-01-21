const express = require('express')
const multer = require('multer')
const firebase = require('./firebase')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))

const upload = multer({
    storage: multer.memoryStorage()
})

app.post('/upload', upload.single('file'), (req, res) => {
    if(!req.file) {
        return res.status(400).send("Error: No files found")
    } 


    const blob = firebase.bucket.file(req.file.originalname)
    
    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })
    
    blobWriter.on('error', (err) => {
        console.log(err)
    })
    
    blobWriter.on('finish', () => {
        res.status(200).send("File uploaded.")
    })
    
    blobWriter.end(req.file.buffer)
})

app.listen(3001, () => {
    console.log('🚀Server listening on port 3001')
})
