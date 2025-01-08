import './animatedCover.sass'

export function AnimatedCover(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="AnimatedCover">
      {props.children}
    </div>
  );
}
