export function formatearFechaConSlashes(fechaStr) {
  if (typeof fechaStr !== 'string') return '';

  return fechaStr.replace(/-/g, '/');
}

export function formatearHoraA12Horas(horaStr) {
  if (typeof horaStr !== 'string') return '';

  const [hora, minutos] = horaStr.split(':');
  const horaNum = parseInt(hora, 10);

  const periodo = horaNum >= 12 ? 'PM' : 'AM';
  const hora12 = horaNum % 12 || 12; // Convierte 0 a 12

  return `${hora12.toString().padStart(2, '0')}:${minutos} ${periodo}`;
}