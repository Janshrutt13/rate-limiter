const BASE = "http://localhost:4000/admin";

export const getstats = () => fetch(`${BASE}/stats`).then(r => r.json());
export const getOffenders = () => fetch(`${BASE}/offenders`).then(r => r.json());
 