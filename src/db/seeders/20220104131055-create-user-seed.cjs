const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
                uuid: 'c7ba68db-c39d-478b-8df9-46be3de7c366',
                first_name: 'John',
                last_name: 'Doe',
                email: 'user@example.com',
                status: 1,
                email_verified: 1,
                password: bcrypt.hashSync('123456', 8),
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
