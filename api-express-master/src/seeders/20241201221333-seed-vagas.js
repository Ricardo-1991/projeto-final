const generatePhoneNumber = () => {
  const areaCode = Math.floor(100 + Math.random() * 900).toString();
  const firstPart = Math.floor(1000 + Math.random() * 9000).toString();
  const secondPart = Math.floor(1000 + Math.random() * 9000).toString();
  return `${areaCode}${firstPart}${secondPart}`;
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("vagas", [
      {
        titulo: "Desenvolvedor Front-end",
        descricao: "Vaga de desenvolvimento de front-end",
        data_cadastro: "2024-06-21",
        telefone: generatePhoneNumber(),
        empresa: "Tech Solutions",
        status: "Aberta",
      },
      {
        titulo: "Analista de Dados",
        descricao: "Vaga de análise de dados",
        data_cadastro: "2024-06-18",
        telefone: generatePhoneNumber(),
        empresa: "Data Insights",
        status: "Fechada",
      },
      {
        titulo: "Gerente de Projetos",
        data_cadastro: "2024-06-15",
        descricao: "Vaga de gerente de projetos",
        telefone: generatePhoneNumber(),
        empresa: "Project Masters",
        status: "Aberta",
      },
      {
        titulo: "Engenheiro de Software",
        data_cadastro: "2024-06-20",
        descricao: "Vaga para engenheiro de software sênior",
        telefone: generatePhoneNumber(),
        empresa: "Future Dynamics",
        status: "Fechada",
      },
      {
        titulo: "Desenvolvedor Back-end",
        data_cadastro: "2024-06-19",
        descricao: "Vaga de desenvolvimento de back-end",
        telefone: generatePhoneNumber(),
        empresa: "Next Systems",
        status: "Aberta",
      },
      {
        titulo: "Product Manager",
        data_cadastro: "2024-06-22",
        descricao: "Vaga para gerente de produtos",
        telefone: generatePhoneNumber(),
        empresa: "Global Innovations",
        status: "Fechada",
      },
      {
        titulo: "UI/UX Designer",
        data_cadastro: "2024-06-16",
        descricao: "Vaga para designer de interfaces e experiência",
        telefone: generatePhoneNumber(),
        empresa: "Creative Labs",
        status: "Aberta",
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("vagas", {}, {});
  },
};
