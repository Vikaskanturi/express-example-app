import 'dotenv/config'
import express from 'express'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add tea to array
app.post("/tea", (req, res) => {
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea);
    res.status(200).send(newTea);
})


//list all tea
app.get("/list", (req, res) => {
    res.status(200).send(teaData);
})


//list specific tea
app.get("/list/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        res.status(404).send(`404 file does not exist`);
    } else {
        res.status(200).send(tea);
    }
})

//update the tea 
app.put("/list/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));

    if (!tea) {
        res.status(404).send(`404 file does not exist`);
    } else {
        const { name, price } = req.body;
        tea.name = name;
        tea.price = price;
        res.status(200).send(tea);
    }
})


// delete the tea with id
app.delete("/list/:id", (req, res) => {
    const teaIndex = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if (teaIndex === -1) {
        res.status(404).send(`404 file does not exist`);
    } else {
        teaData.splice(teaIndex, 1);
        res.status(204).send(`deleted`);
    }
})


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);

})