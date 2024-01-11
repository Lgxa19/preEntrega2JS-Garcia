// Productos, con sus precios y categorias
const productos = [
    { producto: 'camisa', categoria: 'ropa', precio: 30 },
    { producto: 'zapato', categoria: 'ropa', precio: 60 },
    { producto: 'pala', categoria: 'equipamiento', precio: 150 },
    { producto: 'pelota', categoria: 'equipamiento', precio: 10 },
    { producto: 'bolso', categoria: 'accesorios', precio: 80 },
];

// Carrito para meter los productos
const carrito = [];

// Funcion para mostrar los productos, a través de un console log
function mostrarProductos(listaProductos) {
    console.log('Productos disponibles:');
    listaProductos.forEach((productos, index) => {
        console.log(`${index + 1}. ${productos.producto} - $${productos.precio} (${productos.categoria})`);
    });
}

// Funcion para filtrar los productos segun el rango de precio
function filtroPrecio(listaProductos, precioMin, precioMax) {
    return listaProductos.filter(productos => productos.precio >= precioMin && productos.precio <= precioMax);
}

// Funcion para filtrar los productos segun su categoria
function filtrarCategoria(listaProductos, categoria) {
    return listaProductos.filter(productos => productos.categoria === categoria);
}

// Function to get user input for productos selection
function seleccionarProductos(listaProductos) {
    let productoSeleccionado;
    do {
        const productoIndex = prompt('Introduce el numero de producto que quieres comprar.\nPuedes encontrar los productos en la consola.\nEscribe "0" para dejar de agregar productos:');
        if (productoIndex === null || isNaN(productoIndex)) {
            break;
        }
        productoSeleccionado = parseInt(productoIndex) - 1;

        if (productoSeleccionado === -1) {
            break;
        }

        if (productoSeleccionado >= 0 && productoSeleccionado < listaProductos.length) {
            const cantidad = parseInt(prompt('Introduce la cantidad:'));
            if (!isNaN(cantidad) && cantidad > 0) {
                carrito.push({ productos: listaProductos[productoSeleccionado], cantidad });
            } else {
                console.log('Cantidad inválida. Introduce una cantidad válida');
            }
        } else {
            console.log('Selección de producto inválida. Ingresa un número válido.');
        }
    } while (productoSeleccionado !== -1);
}

// Función para pedir información al usuario
function getInfoUsuario() {
    let nombre = prompt('Enter your nombre:');
    let edad = prompt('Enter your age:');
    let tallaCamisa = prompt('Enter your shirt size:');
    let tallaZapato = prompt('Enter your shoe size:');
    let peso = prompt('Enter your weight:');

    return { nombre, edad, tallaCamisa, tallaZapato, peso };
}

// Función para calcular el precio total del carrito
function calcularPrecioTotal() {
    let precioTotal = 0;
    carrito.forEach(item => {
        precioTotal += item.productos.precio * item.cantidad;
    });
    return precioTotal;
}

// Funcion principal del simulador
function main() {
    // Mostrar todos los productos en un console log
    mostrarProductos(productos);

    // Filtrar los productos basados en el input del usuario, basado en precio y categoria
    let precioMin = parseInt(prompt('Introduzca el precio minimo:')) || 0;
    let precioMax = parseInt(prompt('Introduzca el precio máximo:')) || Infinity;
    let categoria = prompt('Introduzca la categoria que quiere buscar (deje en blanco para ver todos los productos):').trim().toLowerCase();

    let filteredProducts = productos;
    if (!isNaN(precioMin) && !isNaN(precioMax) && precioMin <= precioMax) {
        filteredProducts = filtroPrecio(filteredProducts, precioMin, precioMax);
    }

    if (categoria !== '') {
        filteredProducts = filtrarCategoria(filteredProducts, categoria);
    }

    // Mostrar los productos filtrados
    mostrarProductos(filteredProducts);

    // Seleccionar productos y obtener info del usuario
    seleccionarProductos(filteredProducts);
    const userInfo = getInfoUsuario();

    // Mostrar info del usuario, productos seleccionados y precio total
    console.log('Informacion del usuario:');
    console.log(userInfo);

    console.log('Productos seleccionados:');
    console.log(carrito);

    const precioTotal = calcularPrecioTotal();
    console.log(`Precio total: $${precioTotal}`);
}

// Run the program
main();