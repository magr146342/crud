import React, {useState} from 'react'
import { isEmpty } from 'lodash'
import shortid from 'shortid'

function App() {
  const [tarea, setTarea] = useState("")
  const [tareas, setTareas] = useState([])

  const agregarTarea= (e) => {
    e.preventDefault()
    if (isEmpty(tarea)) {
      console.log("Tarea Vacia")
      return
    }

    const nuevaTarea= {
      id: shortid.generate(),
      nombre: tarea
    }
    
    setTareas([...tareas, nuevaTarea])
    setTarea("")
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr></hr>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista De Tareas</h4>
          <ul className="list-group">
            { 
            tareas.map((tarea) => 
              <li className="list-group-item" key={tarea.id}>
              <span className="lead">{tarea.nombre}</span>
              <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
              <button className="btn btn-warning btn-sm float-right">Editar</button>
              </li>
            )
              
            }
          </ul>
        </div>

        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <form onSubmit={agregarTarea}>
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Ingrese la tarea..."
            onChange={(texto) => setTarea(texto.target.value)}
            value={tarea}
            />
            <button className="btn btn-dark btn-block" type="submit">
              Agregar Tarea
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
