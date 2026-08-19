/**
 * Envoltura genérica de estado para datos servidos por los proveedores mock nuevos
 * (Centro de Ayuda, Tipo de Credencial, Representación Proporcional, Base de Datos,
 * Preguntas Frecuentes, Voto en el Extranjero). Modela los 4 estados que debe cubrir
 * la interfaz mientras no exista el backend real que reemplace al mock.
 */
export type ResourceStatus = 'loading' | 'success' | 'empty' | 'error';

export interface ResourceState<T> {
  status: ResourceStatus;
  data?: T;
  error?: string;
}
