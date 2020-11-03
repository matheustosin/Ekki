import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class contacts1604020919673 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "contacts",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "account_id",
                    type: "integer",
                    isUnique: true,
                },
                {
                    name: "user_id",
                    type: "integer",
                    isUnique: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'AccountId',
                    columnNames: ['account_id'],
                    referencedTableName: 'accounts',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'UserId',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contacts");
    }

}


