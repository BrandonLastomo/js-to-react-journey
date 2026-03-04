export default function Button({ operator, onClick, isDisabled }) {
  return (
    <button onClick={onClick} disabled={isDisabled}>
      {operator}
    </button>
  );
}
