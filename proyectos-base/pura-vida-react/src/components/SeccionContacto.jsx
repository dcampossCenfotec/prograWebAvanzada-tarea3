function SeccionContacto() {
  return (
    <section id="contacto" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Contacto</h2>
        <form className="mx-auto" style={{ maxWidth: '640px' }} onSubmit={(event) => event.preventDefault()}>
          <p className="text-muted">Formulario de demostración: los mensajes no se envían.</p>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input id="nombre" name="nombre" type="text" className="form-control" autoComplete="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo</label>
            <input id="correo" name="correo" type="email" className="form-control" autoComplete="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <textarea id="mensaje" name="mensaje" className="form-control" rows={4} required />
          </div>
          <button type="submit" className="btn btn-success">Enviar mensaje</button>
        </form>
      </div>
    </section>
  )
}

export default SeccionContacto
