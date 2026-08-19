export interface TipoCredencialImagen {
  id: string;
  src: string;
  alt: string;
}

export interface TipoCredencial {
  titulo: string;
  imagenes: TipoCredencialImagen[];
}
