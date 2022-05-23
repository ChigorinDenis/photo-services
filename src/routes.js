const host = 'http://localhost:8080';
const prefix = 'constructor';

export default (name) => {
  const paths = {
    getEmployees: [host, 'admin', 'sotrudnik', 'all'].join('/'),
    addEmployee: [host, 'admin', 'sotrudnik', 'add'].join('/'),
    getStock: [host, 'sklad', 'all'].join('/'),
    addStock: [host, 'sklad', 'add-new-item'].join('/'),
  }
  return paths[name];
};
