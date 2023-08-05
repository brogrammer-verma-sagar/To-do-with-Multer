const express = require("express")
const fs = require("fs")
const path = require("path")
const multer = require("multer")

console.log(__dirname)
const tasks=JSON.parse(fs.readFileSync(path.join(__dirname,"data.json")))
const app = express();
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/images',express.static(path.join(__dirname,"./images")))
const storage = multer.diskStorage({
    destination: path.join(__dirname, "images"),
    filename: (req, file, cb) => {
        req.customData=Date.now()
        cb(null, req.customData + path.extname(file.originalname))
    
        
    }

    
})

const upload = multer({ storage })

app.post("/sendTask", upload.single('image'), (req, res) => {
    
    const newTask = {
        ids:"images/"+ req.customData +path.extname(req.file.originalname),
        task: req.body.task
    }
    
    tasks.push(newTask)


    fs.writeFile("./data.json", JSON.stringify(tasks), err => {
      res.redirect("/")
    })

})
app.get("/getTask", (req, res) => {

    let data =JSON.parse(fs.readFileSync('./data.json', "utf-8"));
    
    res.json(data)
})


app.delete("/deleteTasks", (req, res) => {
    let data = JSON.parse(fs.readFileSync('./data.json', "utf-8"))
    let items = req.body.taskIds
    console.log(items)
    // items.forEach(element => {
    //     console.log(element)
    //     const updatedTask=data.filter((val)=> val.ids!==Number(element))
    // });

    updatedData = data.filter((item) => {
        let get = false;
        items.map((value) => {
           fs.unlink(path.join(__dirname,value),(err)=>{
            
           })
            

            if (item.ids == value) {
                get = true;
            }
        });
        if (get === false) {
            return item
        }
    })


    console.log(updatedData)



    fs.writeFile("./data.json", JSON.stringify(updatedData), err => {


        res.status(200).json({
            status: "success"

        })


    })

})

app.listen(port, () => {
    console.log(`server is listening at port ${port} `)
})