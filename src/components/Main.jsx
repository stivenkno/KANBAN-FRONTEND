import Tablero from "./Tablero.jsx";
import Projectos from "./Projectos.jsx";
const Main = ({ selected, setSelected, textColor }) => {
  switch (selected) {
    case "Tablero":
      return <Tablero textColor={textColor} />;
    case "Proyectos":
      return (
        <Projectos
          textColor={textColor}
          selected={selected}
          setSelected={setSelected}
        />
      );

    default:
      return (
        <div className={`p-6 ${textColor}`}>
          <h2 className="text-2xl font-bold">{selected}</h2>
          <p className="text-sm text-gray-400">Contenido en construcción...</p>
        </div>
      );
  }
};

export default Main;
