// ARRAY DE PRODUCTOS


let productos = [
    {
        id: 1,
        nombre: "Laptop Lenovo",
        precio: 2500000,
        categoria: "Tecnología",
        activo: true
    },
    {
        id: 2,
        nombre: "Mouse Gamer",
        precio: 120000,
        categoria: "Gaming",
        activo: true
    },
    {
        id: 3,
        nombre: "Teclado Mecánico",
        precio: 250000,
        categoria: "Gaming",
        activo: true
    },
    {
        id: 4,
        nombre: "Audífonos Bluetooth",
        precio: 180000,
        categoria: "Audio",
        activo: true
    },
    {
        id: 5,
        nombre: "Monitor Samsung",
        precio: 900000,
        categoria: "Tecnología",
        activo: false
    },
    {
        id: 6,
        nombre: "Webcam HD",
        precio: 150000,
        categoria: "Accesorios",
        activo: true
    },
    {
        id: 7,
        nombre: "Parlante Bluetooth",
        precio: 220000,
        categoria: "Audio",
        activo: true
    },
    {
        id: 8,
        nombre: "Cargador USB-C",
        precio: 80000,
        categoria: "Accesorios",
        activo: true
    }
];

// ELEMENTOS DEL DOM

const contenedorProductos = document.getElementById("productos");
const filtroCategoria = document.getElementById("filtroCategoria");
const ordenPrecio = document.getElementById("ordenPrecio");
const total = document.getElementById("total");

// FUNCIÓN PARA MOSTRAR PRODUCTOS

function mostrarProductos(lista) {

    contenedorProductos.innerHTML = "";

    // MAP: transforma cada producto en HTML
    const tarjetas = lista.map(({ id, nombre, precio, categoria, activo }) => {

        return `
            <div class="producto" data-id="${id}">

                <h3>${nombre}</h3>

                <p class="precio">
                    $${precio.toLocaleString("es-CO")}
                </p>

                <p>
                    Categoría: ${categoria}
                </p>

                <p class="${activo ? "activo" : "inactivo"}">
                    ${activo ? "Activo" : "Inactivo"}
                </p>

                <button class="eliminar">
                    Eliminar
                </button>

            </div>
        `;
    });

    contenedorProductos.innerHTML = tarjetas.join("");

    calcularTotal(lista);
}

// REDUCE: CALCULAR TOTAL

function calcularTotal(lista) {

    const suma = lista.reduce((total, { precio }) => {
        return total + precio;
    }, 0);

    total.textContent = `Total: $${suma.toLocaleString("es-CO")}`;
}

// FILTRAR Y ORDENAR

function actualizarProductos() {

    const categoriaSeleccionada = filtroCategoria.value;
    const ordenSeleccionado = ordenPrecio.value;

    // Copiamos el array para no modificar productos original
    let resultado = [...productos];

    // FILTER

    if (categoriaSeleccionada !== "todas") {

        resultado = resultado.filter(
            producto => producto.categoria === categoriaSeleccionada
        );

    }

    // SORT

    if (ordenSeleccionado === "menor") {

        resultado.sort((a, b) => a.precio - b.precio);

    }

    if (ordenSeleccionado === "mayor") {

        resultado.sort((a, b) => b.precio - a.precio);

    }


    // Mostrar resultado
    mostrarProductos(resultado);
}

// EVENTOS DE FILTRO Y ORDEN

filtroCategoria.addEventListener("change", actualizarProductos);

ordenPrecio.addEventListener("change", actualizarProductos);


// DELEGACIÓN DE EVENTOS

contenedorProductos.addEventListener("click", function (evento) {

    const boton = evento.target.closest(".eliminar");

    if (!boton) {
        return;
    }

    const tarjeta = boton.closest(".producto");

    const id = Number(tarjeta.dataset.id);

    productos = productos.filter(producto => producto.id !== id);

    actualizarProductos();

});

// MOSTRAR PRODUCTOS AL CARGAR

mostrarProductos(productos);