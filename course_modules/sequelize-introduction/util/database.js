const Sequelize = require("sequelize");

const sequelize = new Sequelize('node_complete', 'root', 's0ns0fl1b3r7y@MySQLr007', {
  dialect: 'mariadb',
  host: 'localhost',
/*   dialectOptions: {
    
    // Your mariadb options here
    // connectTimeout: 1000
  } */
});

module.exports = sequelize;
