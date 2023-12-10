import { OverflowMenu } from "./components/OverflowMenu";

const between = (from: number, to: number) => Math.floor(Math.random() * (to + 1 - from) + from);

export default function HomePage() {
  const rands = [...Array([14, 20, 21, 22, 26][between(0, 4)])].map(() =>
    [...Array(between(1, 3))].map(() => Math.random().toString(36).slice(-between(2, 5))).join(" ")
  );

  return (
    <OverflowMenu overflowControlLabel="More ▼" className="[&_:where(button,a)]:p-3 [&_:where(button,a)]:block">
      {rands.map((rand, i) => {
        return (
          <li key={rand}>
            <a href={`#${rand}`}>
              {i + 1}: {rand}
            </a>
          </li>
        );
      })}
    </OverflowMenu>
  );
}
