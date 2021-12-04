export default class Vehiculo
{
    constructor (_id, _marca, _modelo, _precio)
    {
        this.id = _id;
        this.marca = _marca;
        this.modelo = _modelo;
        this.precio = _precio;
    }
}

export class Auto extends Vehiculo
{
    constructor (_id, _marca, _modelo, _precio, _cantidadPuertas=3)
    {
        super(_id, _marca, _modelo, _precio);
        this.cantidadPueras = _cantidadPuertas;
    }
}

export class Camioneta extends Vehiculo
{
    constructor (_id, _marca, _modelo, _precio, _cuatroXCuatro=true)
    {
        super(_id, _marca, _modelo, _precio);
        this.cuatroXCuatro = _cuatroXCuatro;
    }
}

