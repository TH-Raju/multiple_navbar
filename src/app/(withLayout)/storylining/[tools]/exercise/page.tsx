import { Exercise } from "./components/exercise-comp";

export default function ExercisePage({ params, searchParams }) {
  return <Exercise params={params} searchParams={searchParams} />;
}
