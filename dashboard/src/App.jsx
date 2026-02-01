import Overview from "./pages/Overview";
import Offenders from "./pages/Offenders";

export default function App(){
  return (
    <div className="p-6 space-y-6">
        <Overview />
        <Offenders />
    </div>
  );
}