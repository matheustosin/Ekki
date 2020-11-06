import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class transferHistory1604550049605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "transfer_history",
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
                    name: "dt_transfer",
                    type: "date"
                },
                {
                    name: "value",
                    type: "decimal",
                    scale: 2
                },
                {
                    name: "user_id",
                    type: "integer"
                },
                {
                    name: "contact_id",
                    type: "integer"
                }
            ],
            foreignKeys: [
                {
                    name: 'UserId',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'ContactId',
                    columnNames: ['contact_id'],
                    referencedTableName: 'contacts',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transfer_history");
    }

}
