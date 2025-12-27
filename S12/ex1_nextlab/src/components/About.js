import { Link } from 'react-router-dom'

const About = () => {
    return (
        <>
            <p>About Page</p>
            <p>Aceasta este pagina cu detalii despre aplicatie.</p>
            <Link to="/">Inapoi la Home</Link>
        </>
    )
}

export default About;