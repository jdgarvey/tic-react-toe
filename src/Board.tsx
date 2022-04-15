import { Square } from "./Square";

interface BoardProps {
  squares: Array<string | null>;
  squareClicked: (i: number) => void;
}

export const Board = (props: BoardProps) => {
  const squares = props.squares.map((_, i) => 
    <Square
      key={i}
      value={props.squares[i]}
      squareClicked={() => props.squareClicked(i)}
    />
  )

  return <div className="board">{squares}</div>;
}