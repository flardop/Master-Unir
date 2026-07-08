import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Noticia {
  titulo: string;
  imagen: string;
  texto: string;
  fecha: string;
}

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  mensajeError = '';

  nuevaNoticia: Noticia = {
    titulo: '',
    imagen: '',
    texto: '',
    fecha: '',
  };

  noticias: Noticia[] = [];

  agregarNoticia(formulario: NgForm): void {
    const noticiaLimpia: Noticia = {
      titulo: this.nuevaNoticia.titulo.trim(),
      imagen: this.nuevaNoticia.imagen.trim(),
      texto: this.nuevaNoticia.texto.trim(),
      fecha: this.nuevaNoticia.fecha.trim(),
    };

    if (!noticiaLimpia.titulo || !noticiaLimpia.imagen || !noticiaLimpia.texto || !noticiaLimpia.fecha) {
      this.mensajeError = 'Todos los campos son obligatorios. Completa la noticia antes de publicarla.';
      return;
    }

    this.noticias.unshift(noticiaLimpia);
    this.mensajeError = '';
    this.nuevaNoticia = {
      titulo: '',
      imagen: '',
      texto: '',
      fecha: '',
    };
    formulario.resetForm();
  }

  trackByTitulo(_: number, noticia: Noticia): string {
    return `${noticia.titulo}-${noticia.fecha}`;
  }
}