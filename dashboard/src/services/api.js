const API_BASE = 'http://localhost:4000';

export const getStats = async () => {
  const response = await fetch(`${API_BASE}/admin/stats`);
  return response.json();
};

export const getOffenders = async () => {
  const response = await fetch(`${API_BASE}/admin/offenders`);
  return response.json();
};

export const getChartData = async () => {
  const response = await fetch(`${API_BASE}/admin/chart`);
  return response.json();
};