namespace MaratonApi.Modelos;

// Una fila de la tabla Generos: el catálogo de géneros.
public class Genero
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";

    // Las series de este género (1 a muchos)
    public List<Serie> Series { get; set; } = [];
    public List<Miembro> Miembros { get; set; } = [];
}
