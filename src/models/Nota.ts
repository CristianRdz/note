export class Nota {
    public id: number;
    public titulo: string;
    public contenido: string;
    public fecha: string;
  
    constructor(id: number, titulo: string, contenido: string, fecha: string) {
      this.id = id;
      this.titulo = titulo;
      this.contenido = contenido;
      this.fecha = fecha;
    }
  }