import './animatedCover.sass'

// AnimatedCover
export function AnimatedCover(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="AnimatedCover">
      {props.children}
    </div>
  );
}
