module.exports = (sequelize, DataTypes) => {
    const RefreshTokenCustomer = sequelize.define('RefreshTokenCustomer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, 
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.INTEGER,
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
        tableName: 'refresh_tokens_customer',
        timestamps: true
    });
    return RefreshTokenCustomer;
}

