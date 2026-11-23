export function siguienteEstado(estado) {
  const estados = ['Por ver', 'Viendo', 'Vista']
  return estados[(estados.indexOf(estado) + 1) % estados.length]
}
