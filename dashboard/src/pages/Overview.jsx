import { useEffect , useState } from "react";
import {getstats} from "../services/api";
import StatCard from "../components/StatsCard";

export default function Overview() {
    const [stats , setStats] = useState({});

    useEffect( () => {
        getstats().then(setStats);
    } , []);

    return(
        <div className="grid grid-cols-3 gap-4">
           <StatCard label = "Total Requests" value={stats.total} />
           <StatCard label = "Blocked IPs" value={stats.blocked} />
           <StatCard label = "Offenders" value={stats.offenders} /> 
        </div>
    )
}