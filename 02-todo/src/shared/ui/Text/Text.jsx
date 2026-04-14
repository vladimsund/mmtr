export default function Text({ text, onClick, className }) {
  return (
    <span className={className} onClick={onClick}>
      {text}
    </span>
  );
}
