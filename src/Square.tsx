interface SquareProps {
  value: string | null;
  squareClicked: () => void;
}

export const Square = (props: SquareProps) => {
  return (
    <button className="square" onClick={props.squareClicked}>
      {props.value}
    </button>
  );
}