import "./styles/App.css";
import encuestas from "./data/encuestas.json";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Inicio } from "./components/Inicio";
import { CrearEncuesta } from "./components/CrearEncuesta";
import { Encuesta } from "./components/Encuesta";
import { NotFound } from "./components/NotFound";

function App() {
  const [listaEncuestas, setListaEncuestas] = useState(encuestas);
  const agregarEncuesta = (nuevaEncuesta) => {
    nuevaEncuesta.id = listaEncuestas.length + 1;
    setListaEncuestas([...listaEncuestas, nuevaEncuesta]);
  };
  const responderEncuesta = (id, respuestas) => {
    const encuesta = listaEncuestas.find((enc) => enc.id === parseInt(id));
    encuesta.respuestas = [respuestas];
  };

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio listaEncuestas={listaEncuestas} />} />
        <Route
          path="/encuesta/crear"
          element={<CrearEncuesta agregarEncuesta={agregarEncuesta} />}
        />
        <Route
          path="/encuesta/:id"
          element={
            <Encuesta
              listaEncuestas={listaEncuestas}
              responderEncuesta={responderEncuesta}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
