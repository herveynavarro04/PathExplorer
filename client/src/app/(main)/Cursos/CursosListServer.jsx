import CursosPanelClient from './CursosPanelClient';

const CursosListServer = async() => {
    const res = await fetch('http://localhost:3000/cursos.json');
    const data = await res.json();

    const cursos = data.cursos || [];
    return <CursosPanelClient initialCursos={cursos} />;
};

export default CursosListServer;
