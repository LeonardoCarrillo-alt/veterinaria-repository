import '/src/pages/login.css'


type ProductProps = {
    id: number;
    name: string;
    description: string;
    price: number;
};
export default function Product({ id, name, description, price }: ProductProps) {

    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '40px'}}>
                <div style={{width: '30%', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '40px'}}>
                    <h2 style={{fontFamily: 'Arial', fontSize: '1.5rem'}}>{name}</h2>
                    <p style={{fontFamily: 'Arial', fontSize: '1rem'}}>{id}</p>
                    <p style={{fontFamily: 'Arial', fontSize: '1rem'}}>{description}</p>
                    <p style={{fontFamily: 'Arial', fontSize: '1rem'}}>{price}</p>
                </div>
            </div>
        </div>
    );
}


