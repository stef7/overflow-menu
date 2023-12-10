import Link from "next/link";
import { OverflowMenu } from "./components/OverflowMenu";

const between = (from: number, to: number) => Math.floor(Math.random() * (to + 1 - from) + from);

const getRands = (length: number) =>
  [...Array(length)].map(
    (_, i) =>
      `${i + 1}: ${[...Array(between(1, 3))].map(() => Math.random().toString(36).slice(-between(1, 4))).join(" ")}`
  );

export default function HomePage({
  searchParams,
}: {
  readonly searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentLength = Number(searchParams.length) || 10;

  return (
    <>
      <p className="flex flex-wrap p-4">
        Length:
        {[10, 20, 21, 32].map((length) => (
          <Link
            key={length}
            href={{ query: { length } }}
            className={`p-4 -my-4 ${currentLength === length ? "bg-yellow-200" : ""}`}
          >
            {length}
          </Link>
        ))}
      </p>

      <OverflowMenu overflowControlLabel="More ▼" className="[&_:where(button,a)]:p-4 [&_:where(button,a)]:block">
        {getRands(currentLength).map((rand) => (
          <li key={rand}>
            <a href={`#${rand}`}>{rand}</a>
          </li>
        ))}
      </OverflowMenu>
    </>
  );
}
