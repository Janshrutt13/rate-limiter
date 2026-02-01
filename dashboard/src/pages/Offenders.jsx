import { useEffect, useState } from "react";
import { getOffenders } from "../services/api";

export default function Offenders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getOffenders().then(setData);
  }, []);

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>IP</th>
          <th>Risk</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.ip}>
            <td>{row.ip}</td>
            <td>{row.risk}</td>
            <td>{row.blocked ? "Blocked" : "Active"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}