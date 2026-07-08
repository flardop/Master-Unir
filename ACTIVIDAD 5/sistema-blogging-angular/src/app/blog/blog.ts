import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Noticia {
  titulo: string;
  imagen: string;
  texto: string;
  fecha: string;
}

const STORAGE_KEY = 'blog-noticias';

const NOTICIAS_INICIALES: Noticia[] = [
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

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  mensajeError = '';

  nuevaNoticia: Noticia = {
    titulo: '',
    imagen: '',
    texto: '',
    fecha: '',
  };

  noticias: Noticia[] = [...NOTICIAS_INICIALES];

  ngOnInit(): void {
    this.cargarNoticias();
  }

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
    this.guardarNoticias();
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

  private cargarNoticias(): void {
    const storage = this.obtenerStorage();

    if (!storage) {
      this.noticias = [...NOTICIAS_INICIALES];
      return;
    }

    const noticiasGuardadas = storage.getItem(STORAGE_KEY);

    if (!noticiasGuardadas) {
      this.noticias = [...NOTICIAS_INICIALES];
      return;
    }

    try {
      const noticiasParseadas = JSON.parse(noticiasGuardadas) as Noticia[];
      this.noticias = Array.isArray(noticiasParseadas) && noticiasParseadas.length > 0
        ? noticiasParseadas
        : [...NOTICIAS_INICIALES];
    } catch {
      this.noticias = [...NOTICIAS_INICIALES];
    }
  }

  private guardarNoticias(): void {
    const storage = this.obtenerStorage();

    if (!storage) {
      return;
    }

    storage.setItem(STORAGE_KEY, JSON.stringify(this.noticias));
  }

  private obtenerStorage(): Storage | null {
    if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) {
      return null;
    }

    return globalThis.localStorage;
  }
}
