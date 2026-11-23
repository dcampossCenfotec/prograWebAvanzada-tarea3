import { ESTADOS } from "../../data/series.js";
function Filtros({ miembros = [], estado, miembro, onCambiarEstado, onCambiarMiembro, onLimpiar }) {
  return (
    <div className="filtros">
      <div className="row g-3">
      <div className="col-sm-6">
        <label htmlFor="filtro-estado" className="form-label">
          Estado
        </label>
        <select
          id="filtro-estado"
          className="form-select"
          value={estado}
          onChange={(event) => onCambiarEstado(event.target.value)}
        >
          <option value="Todos">Todos</option>
          {ESTADOS.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </div>
      <div className="col-sm-6">
        <label htmlFor="filtro-miembro" className="form-label">
          Propuesta por
        </label>
        <select
          id="filtro-miembro"
          className="form-select"
          value={miembro}
          onChange={(event) => onCambiarMiembro(event.target.value)}
        >
          <option value="Todos">Todos</option>
          {miembros.map((opcion) => (
            <option key={opcion._id} value={opcion.nombre}>
              {opcion.nombre}
            </option>
          ))}
        </select>
      </div>
      </div>
      {(estado !== "Todos" || miembro !== "Todos") && (
        <div className="filtros-pie">
          <span>Filtros activos</span>
          <button type="button" className="limpiar-filtros" onClick={onLimpiar}>Limpiar filtros</button>
        </div>
      )}
    </div>
  );
}
export default Filtros;
