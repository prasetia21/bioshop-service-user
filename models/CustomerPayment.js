module.exports = (sequelize, DataTypes) => {
    const CustomersPayment = sequelize.define('CustomersPayment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, 
        customers_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: false,
        }
    }, {
        tableName: 'customers_payment',
        timestamps: true
    });
    return CustomersPayment;
}

