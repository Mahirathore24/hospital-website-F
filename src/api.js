const API = {
  async post(path, data, token){
    const headers = {'Content-Type':'application/json'};
    if(token) headers['Authorization'] = `Bearer ${token}`;
    try {
      const res = await fetch('/api' + path, { method: 'POST', headers, body: JSON.stringify(data) });
      const json = await res.json().catch(()=>({}));
      if(!res.ok) throw json;
      return json;
    } catch(err) {
      // Network error (backend not running)
      if(err.message && err.message.includes('fetch')) {
        throw new Error('NetworkError: Cannot connect to backend server. Please ensure backend is running at http://localhost:5000');
      }
      throw err;
    }
  },
  async get(path, token){
    const headers = {};
    if(token) headers['Authorization'] = `Bearer ${token}`;
    try {
      const res = await fetch('/api' + path, { method: 'GET', headers });
      const json = await res.json().catch(()=>({}));
      if(!res.ok) throw json;
      return json;
    } catch(err) {
      if(err.message && err.message.includes('fetch')) {
        throw new Error('NetworkError: Cannot connect to backend server. Please ensure backend is running at http://localhost:5000');
      }
      throw err;
    }
  }
}

export default API;
