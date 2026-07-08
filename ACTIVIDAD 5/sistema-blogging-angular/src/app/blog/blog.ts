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

    noticias: Noticia[] = [
    {
      titulo: 'Angular 20 mejora la experiencia de desarrollo',
      imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      texto: 'La nueva version de Angular sigue apostando por una experiencia moderna, rapida y enfocada en componentes.',
      fecha: '2026-06-28',
    },
    {
      titulo: 'GitHub facilita el trabajo colaborativo',
      imagen: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80',
      texto: 'Usar ramas, commits y repositorios publicos permite entregar proyectos con un historial claro de cambios.',
      fecha: '2026-07-01',
    },
  ];

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