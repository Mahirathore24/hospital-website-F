const API = {
  async post(path, data, token){
    const headers = {'Content-Type':'application/json'};
    if(token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch('/api' + path, { method: 'POST', headers, body: JSON.stringify(data) });
    const json = await res.json().catch(()=>({}));
    if(!res.ok) throw json;
    return json;
  },
  async get(path, token){
    const headers = {};
    if(token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch('/api' + path, { method: 'GET', headers });
    const json = await res.json().catch(()=>({}));
    if(!res.ok) throw json;
    return json;
  }
}

export default API;
