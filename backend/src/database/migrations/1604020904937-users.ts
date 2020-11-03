import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class users1604020904937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
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
                    name: "cpf",
                    type: "varchar",
                },
                {
                    name: "phone",
                    type: "varchar",
                },
                {
                    name: "account_id",
                    type: "integer",
                    isUnique: true,
                },
            ],
            foreignKeys: [
                {
                    name: 'AccountId',
                    columnNames: ['account_id'],
                    referencedTableName: 'accounts',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
