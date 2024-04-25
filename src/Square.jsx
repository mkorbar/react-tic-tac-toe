
function Square({ value, onSquareClick }) {
    return <button onClick={onSquareClick} className="square" type='button'>{value}</button>;
}

export default Square;
