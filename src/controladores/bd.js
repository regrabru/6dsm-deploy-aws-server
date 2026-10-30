// Importa o pacote pg e desestrutura a propriedade Pool
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// Configuração do pool de conexão com o PostgreSQL.
// Os parâmetros vêm de variáveis de ambiente (arquivo .env no computador
// ou variáveis definidas no servidor EC2), nunca escritos no código.
//
// Opção 1: BDURI (ex.: postgres://usuario:senha@host:5432/bdabp)
// Opção 2: BDHOST, BDPORTA, BDUSUARIO, BDSENHA e BDNOME (usada com o Amazon RDS)
//
// BDSSL=true ativa SSL. O Amazon RDS PostgreSQL 15+ exige conexão com SSL.
const usarSSL = process.env.BDSSL === "true";

const config = process.env.BDURI
  ? { connectionString: process.env.BDURI }
  : {
      user: process.env.BDUSUARIO,
      host: process.env.BDHOST,
      database: process.env.BDNOME,
      password: process.env.BDSENHA,
      port: Number(process.env.BDPORTA || 5432),
    };

if (usarSSL) {
  config.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(config);

// Exporta a variável pool
module.exports = { pool };
