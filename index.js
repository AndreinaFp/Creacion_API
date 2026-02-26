const express = require("express");
const app = express();
app.use (express.json());

let usuarios = [];//base temporal 

app.get("/",(req, res) =>{
    res.send("API funcionando correctamente");
});

//obtener todos los usuarios
app.get("/usuarios", (req,res) =>{
    res.json(usuarios);

});

//obtener usuarios por id get
app.get("/usuarios/:id", (req , res)=>{
    const id = parseInt(req.params.id);

    const usuario = usuarios.find(u => u.id ===id);

    if (!usuario){
        return res.status(400).json({error: "usuario no encontrado"});
    }
    res.json(usuario);
})


//crear usuarios post
app.post("/usuarios", (req, res) =>{
    const nuevoUsuario ={
        id: usuarios.length +1,
        nombre: req.body.nombre,
        email: req.body.email
    };

    usuarios.push(nuevoUsuario);
    res.json({
        mensaje:"usuario creado",
        usuario: nuevoUsuario
    });


});

app.delete("/usuarios/:id", (req, res)=>{
    const id=parseInt(req.params.id);

    const indice=usuarios.findIndex(u => u.id ===id);
    if (indice=== -1){
        return res.status(400).json({
            error: "usuario no encontrado"
        });
    }

    const eliminado=usuarios.splice(indice, 1);
    res.json({
        mensaje: "usuario eliminado",
        usuario: eliminado [0]
    })

})




app.listen(3000, ()=>{
    console.log("servidor en http://localhost:3000");

});