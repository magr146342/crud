import React, {useState} from 'react'
import { isEmpty, size } from 'lodash'
import shortid from 'shortid'

function App() {
  const [tarea, setTarea] = useState("")
  const [tareas, setTareas] = useState([])
  const [modoEditar, setmodoEditar] = useState(false)
  const [id, setId] = useState("")
  const [error, seterror] = useState(null)

  const validacionform =() => {
    let esValido = true
    seterror(null)
    if (isEmpty(tarea)) {
      seterror("Debe ingresar una tarea.")
      esValido = false
    }
    return esValido
  }

  //funcion agregar tarea
  const agregarTarea= (e) => {
    e.preventDefault()

    if (!validacionform()) {
      return
    }

    const nuevaTarea= {
      id: shortid.generate(),
      nombre: tarea
    }
    
    setTareas([...tareas, nuevaTarea])
    setTarea("")
  }

    //funcion guardar tarea
    const guardarTarea= (e) => {
      e.preventDefault()
      if (!validacionform()) {
        return
      }
      
      const tareasEditada = tareas.map(item => item.id === id ? {id, nombre: tarea} : item)
      setTareas(tareasEditada)
      setmodoEditar(false)
      setTarea("")
      setId("")
    }

  //funcion eliminar tarea
  const eliminarTarea=(id) => {
    const filtrartareas = tareas.filter(tarea => tarea.id !== id)
    setTareas(filtrartareas)
  }

  //funcion editar tarea
  const editarTarea=(laTarea) => {
    setTarea(laTarea.nombre)
    setmodoEditar(true)
    setId(laTarea.id)
  }


  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr></hr>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista De Tareas</h4>
          {
            size(tareas) == 0 ? 
            (<li className="list-group-item">No hay tareas programadas.</li>) :
            (
              <ul className="list-group">
                { 
                  tareas.map((tarea) => 
                    <li className="list-group-item" key={tarea.id}>
                      <span className="lead">{tarea.nombre}</span>
                      <button 
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick = {() => eliminarTarea(tarea.id)}>
                        
                        Eliminar</button>

                      <button 
                      className="btn btn-warning btn-sm float-right"
                      onClick = {() => editarTarea(tarea)}>
                        Editar</button>
                    </li>
                  ) 
                }
              </ul>
            )
          }
        </div>

        <div className="col-4">
          <h4 className="text-center">{modoEditar ? "Modificar Tarea" : "Agregar Tarea"}</h4>
          <form onSubmit={modoEditar ? guardarTarea : agregarTarea}>
            {
            error && <span className="text-danger">{error}</span>
            }
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Ingrese la tarea..."
            onChange={(texto) => setTarea(texto.target.value)}
            value={tarea}
            />
            <button className= {modoEditar ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} type="submit">
              {modoEditar ? "Editar Tarea" : "Agregar Tarea"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
