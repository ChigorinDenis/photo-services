export const host = 'http://localhost:8080';
// export const host = 'http://185.123.43.20:8080';
const prefix = 'constructor';

export default (name) => {
  const paths = {
    getEmployees: [host, 'admin', 'sotrudnik', 'all'].join('/'),
    getPhotographers: [host, 'photograph', 'all-by-user-role', 'PHOTOGRAPHER'].join('/'),
    addEmployee: [host, 'admin', 'sotrudnik', 'add'].join('/'),
    getClients: [host, 'admin','get-all-clients'].join('/'),
    getStock: [host, 'sklad', 'all'].join('/'),
    getServices: [host, 'admin', 'usluga', 'all' ].join('/'),
    getDiscount: [host, 'sotrudnik', 'skidka', 'all'].join('/'), 
    getShedules: (id, date) => ([host, 'admin', 'sotrudnik', id, 'get-grafik', 'from', date].join('/')),
    getRangeShedules: (id, date1, date2) => ([host, 'admin', 'sotrudnik', id, 'get-grafik', 'from', date1, 'to', date2].join('/')),
    getIncomeExpense: (date1, date2) => ([host, 'admin', 'get-income-expense-by-date', date1, date2].join('/')),
    getIncomeExpenseExcel: (date1, date2) => ([host, 'admin', 'print-income-expense-by-date', date1, date2].join('/')),
    getConsumption: (dateStart, dateEnd,  idMaterial) => (`${host}/admin/get-consumption-between-dates-for-one/${dateStart}/${dateEnd}/${idMaterial}`),
    getMaterialsByService: (id) => `${host}/sotrudnik/get-rashodniki-by-usluga/${id}`,
    addDiscount: `${host}/sotrudnik/skidka/add`,
    addStock: [host, 'sklad', 'add-new-item'].join('/'),
    addOrder: [host, 'client', 'add-new-zakaz' ].join('/'),
    getOrders: [host, 'client', 'get-all-zakazy'].join('/'),
    getOrdersPhotosession: (id_sotrudnik) => ([host, 'sotrudnik', 'get-zakazy-for-photograph', '2022-05-13', '2022-06-30', id_sotrudnik].join('/')),
    getShedulesBetweenDates: (id_sotrudnik, date1, date2) => (`${host}/admin/sotrudnik/${id_sotrudnik}/get-grafik/from/${date1}/to/${date2}`),
    addShedule: [host, 'admin', 'sotrudnik', 'add-grafik'].join('/'),
    addOrderToPhotograph: `${host}/client/add-to-photograph`,
    addService: (id_sotr) => ([host, 'admin', 'usluga', 'add', id_sotr].join('/')),
    addMaterial: [host, 'admin', 'rashodnik', 'add'].join('/'), 
    addAva: (id) => ([host, 'admin', 'sotrudnik', 'add-avatar', id].join('/')),
    registration: [host, 'registration', 'add-client'].join('/'),
    login: [host, 'login'].join('/'),
  }
  return paths[name];
};
