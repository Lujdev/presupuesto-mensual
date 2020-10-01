import React, {useState, useEffect} from 'react';
import Pregunta from './Components/Pregunta';
import Formulario from './Components/Formulario';
import Listado from './Components/Listado';
import ControlPresupuesto from './Components/ControlPresupuesto';


function App() {

  //Definir State
  const [presupuesto, setPresupuesto] = useState(0);
  const [restante, setRestante] = useState(0);
  const [ mostrarpregunta, actualizarPregunta ] = useState(true);
  const [ gastos, guardarGastos ] = useState([]);
  const [ gasto, guardarGasto] = useState({});
  const [ creargasto, guardarCrearGasto] = useState(false);

  //UseEffect que actualiza el restante

  useEffect(() => {
    if(creargasto) {
      guardarGastos([
        ...gastos,
        gasto
      ]);

      //Resta del presupuesto actual

      const presupuestoRestante = restante - gasto.cantidad;
      setRestante(presupuestoRestante);

      //Resetear a false
      guardarCrearGasto(false);
    }
  }, [gasto]);

 

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>

        <div className="contenido-principal contenido">
          { mostrarpregunta ?
            (<Pregunta
              setPresupuesto={setPresupuesto}
              setRestante={setRestante}
              actualizarPregunta={actualizarPregunta}
            />)
          
          : 
            (
            <div className="row">
              <div className="one-half column">
                <Formulario
                  guardarGasto={guardarGasto}
                  guardarCrearGasto={guardarCrearGasto}
                />
              </div>
              <div className="one-half column">
                <Listado 
                  gastos={gastos}
                />

                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>
            </div>
            )
          }
          

          
        </div>
      </header>
    </div>
  );
}

export default App;
