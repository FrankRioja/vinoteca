const productos = [
    {
       id: "vinoc-01",
        titulo: "Vino Cabernet 01",
        imagen: "./img/vinoc-01.jfif",
        categoria: {
            nombre: "Vinos Cabernet",
            id: "Cabernet"
        },
        precio: 1000
    },
    {
        id: "vinoc-02",
       titulo: "Vino Cabernet 02",
       imagen: "./img/vinoc-02.jfif",
        categoria: {
            nombre: "Vinos Cabernet",
            id: "Cabernet"
        },
        precio: 950
    },
      {
        id: "vinoc-03",
        titulo: "Vino Cabernet 03",
        imagen: "./img/vinoc-03.jfif",
        categoria: {
            nombre: "Vinos Cabernet",
            id: "Cabernet"
        },
        precio: 1250
    },
      {
        id: "vinoc-04",
        titulo: "Vino Cabernet 04",
        imagen: "./img/vinoc-04.jfif",
        categoria: {
            nombre: "Vinos Cabernet",
            id: "Cabernet"
        },
        precio: 1900
    },
      {
        id: "vinom-01",
        titulo: "Vino Malbec 01",
        imagen: "./img/vinom-01.webp",
        categoria: {
            nombre: "Vinos Malbec",
            id: "Malbec"
        },
        precio: 800
    },
      {
        id: "vinom-02",
        titulo: "Vino Malbec 02",
        imagen: "./img/vinom-02.webp",
        categoria: {
            nombre: "Vinos Malbec",
            id: "Malbec"
        },
        precio: 1420
    },
      {
        id: "vinom-03",
        titulo: "Vino Malbec 03",
        imagen: "./img/vinom-03.webp",
        categoria: {
            nombre: "Vinos Malbec",
            id: "Malbec"
        },
        precio: 1520
    },
      {
        id: "vinom-04",
        titulo: "Vino Malbec 04",
       imagen: "./img/vinom-04.jpg",
        categoria: {
            nombre: "Vinos Malbec",
            id: "Malbec"
        },
        precio: 1350
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })
        actualizarBotonesAgregar(productos)

}

cargarProductos(productos)
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    
    actualizarNumerito();
} else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}