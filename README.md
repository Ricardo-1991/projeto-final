# README  

## **Aplicação Final - Residência TIC 36**  

Este projeto é a entrega final da Residência TIC 36 e está dividido em dois repositórios:  

1. **Backend**: API desenvolvida com Node.js e Express.  
2. **Mobile**: Aplicação móvel desenvolvida com React Native e Expo, conectando-se ao backend.  

---

## **Configuração e Execução do Projeto**  

### **1. Executando o Backend** 


1. Acesse o diretório do backend:
```bash
cd api-express-master/ 
```

2. Instale as dependências:
```bash
npm install  
```

3. Inicie o servidor:
```bash
npm start
```

O backend estará rodando na porta configurada no código. Certifique-se de que ele está acessível para a aplicação mobile.

### **Dependências do Backend**  

O projeto utiliza as seguintes dependências:

- **bcrypt: Para criptografia de senhas.**
- **express: Framework para criação da API.**
- **sqlite3: Banco de dados leve e embutido.**
- **zod: Biblioteca para validação e segurança de dados.**
- **TypeScript: Para maior segurança e produtividade no desenvolvimento.**
- **jsonWebToken: Para geração e validação de tokens JWT.**
- **sequelize: ORM para facilitar a interação com bancos de dados relacionais.**



**2. Executando a Aplicação Mobile**

A aplicação mobile foi desenvolvida com React Native e gerenciada pelo Expo, facilitando o desenvolvimento multiplataforma.

1. Acesse o diretório do repositório mobile:
```bash
cd restic36-app-vagacerta-main/  
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o aplicativo mobile:
```bash
npx expo start
```
O comando abrirá o Expo Developer Tools no navegador, permitindo que você escolha onde rodar o app (emulador, dispositivo físico ou web).

***Dependências do Mobile***
O projeto utiliza as seguintes dependências:

- **axios: Para requisições HTTP.**
- **react-hook-form: Para gerenciamento de formulários.**
- **jwt-decode: Para decodificar tokens JWT.**
- **styled-components: Para estilização de componentes.**
- **zod: Para validação de dados.**
- **yup: Outra biblioteca para validação de dados.**

***Observações Importantes***

***1 - Certifique-se de que o backend está rodando antes de iniciar a aplicação mobile.***

***2 - Caso o mobile não rode apenas instalando as dependências com o comando npm install, pode ser necessário forçar a instalação das depêndencias com o seguinte comando:***

```bash
npm install --legacy-peer-deps  
```

***3 - Caso a tabela de vagas não venha pré-populada no SQLite, execute o seguinte comando para incluir os dados pré-cadastrados:***
```bash
npx sequelize-cli db:seed:all
```

