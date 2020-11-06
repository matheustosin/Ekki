import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class accounts1604020873897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "accounts",
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
                    name: "nr_account",
                    type: "integer",
                    isUnique: true
                },
                {
                    name: "balance",
                    type: "float",
                },
                {
                    name: "limit_value",
                    type: "float",
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("accounts");
    }

}
