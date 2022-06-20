const host = 'http://localhost:8080';
// const host = 'http://25.63.58.40:8080';
const prefix = 'constructor';

export default (name) => {
  const paths = {
    getEmployees: [host, 'admin', 'sotrudnik', 'all'].join('/'),
    addEmployee: [host, 'admin', 'sotrudnik', 'add'].join('/'),
    getStock: [host, 'sklad', 'all'].join('/'),
    getServices: [host, 'admin', 'usluga', 'all' ].join('/'),
    getDiscount: [host, 'sotrudnik', 'skidka', 'all'].join('/'), 
    getShedules: (id, date) => ([host, 'admin', 'sotrudnik', id, 'get-grafik', 'from', date].join('/')),
    getRangeShedules: (id, date1, date2) => ([host, 'admin', 'sotrudnik', id, 'get-grafik', 'from', date1, 'to', date2].join('/')),
    addStock: [host, 'sklad', 'add-new-item'].join('/'),
    addOrder: [host, 'client', 'add-new-zakaz' ].join('/'),
    getOrders: [host, 'client', 'get-all-zakazy'].join('/'),
    addShedule: [host, 'admin', 'sotrudnik', 'add-grafik'].join('/'),
    addService: (id_sotr) => ([host, 'admin', 'usluga', 'add', id_sotr].join('/')),
    addMaterial: [host, 'admin', 'rashodnik', 'add'].join('/'), 
    addAva: (id) => ([host, 'admin', 'sotrudnik', 'add-avatar', id].join('/')),
    registration: [host, 'registration', 'add-client'].join('/'),
    login: [host, 'login'].join('/'),
  }
  return paths[name];
};
