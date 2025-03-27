import './Pokemon.css'
function Pokemon({ name, image, types, id}) {
    return (
        <div className="pokemon-card">
            <p>{id}</p>
            <h2>{name}</h2>
            <img src={image}/>
            <p>Types: {types}</p>
        </div>
    );
}


export default Pokemon;