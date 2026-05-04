import Papa from 'papaparse';

// Mock data generation
const generateMockData = (count) => {
  const data = [];
  const diretorias = ['DIPSE', 'DIOP', 'DIFOB', 'GABINETE SAGEP'];
  const coordenacoes = ['CCM', 'COR', 'CAPO', 'CFOP', 'CPS', 'CVAS', 'CADDEP'];
  const escolaridades = ['Ensino Médio', 'Graduação', 'Especialização', 'Mestrado', 'Doutorado'];
  const formacoes = ['Administração', 'Direito', 'Contabilidade', 'Tecnologia da Informação', 'Psicologia', 'Engenharia', 'Pedagogia'];
  const tempos = ['Menos de 1 ano', '1 a 3 anos', '3 a 5 anos', '5 a 10 anos', 'Mais de 10 anos'];
  const softSkillsOptions = ['Liderança', 'Comunicação', 'Trabalho em Equipe', 'Resolução de Problemas', 'Inteligência Emocional', 'Adaptabilidade'];
  const hardSkillsOptions = ['Pacote Office', 'Análise de Dados', 'Gestão de Projetos', 'Redação Oficial', 'Desenvolvimento de Software', 'Gestão Financeira'];
  const interesses = ['Pós-graduação', 'Cursos Rápidos', 'Mestrado', 'Doutorado', 'Idiomas'];

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomMultiple = (arr, max) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * max) + 1).join(';');
  };
  const getRandomScore = () => Math.floor(Math.random() * 3) + 3; // Scores between 3 and 5

  for (let i = 0; i < count; i++) {
    data.push({
      'Carimbo de data/hora': `24/04/2026 ${10 + Math.floor(i / 60)}:${(i % 60).toString().padStart(2, '0')}:00`,
      'Nome completo': `Servidor Fictício ${i + 1}`,
      'Diretoria': getRandomItem(diretorias),
      'Coordenação': getRandomItem(coordenacoes),
      'Cargo': 'Analista',
      'Grau de Escolaridade': getRandomItem(escolaridades),
      'Área de Formação': getRandomItem(formacoes),
      'Tempo de Serviço na SAGEP': getRandomItem(tempos),
      'Clima_Lideranca': getRandomScore(),
      'Clima_Ambiente': getRandomScore(),
      'Clima_Comunicacao': getRandomScore(),
      'Clima_Reconhecimento': getRandomScore(),
      'Percepcao_Institucional': getRandomScore(),
      'Engajamento': getRandomScore(),
      'Soft Skills': getRandomMultiple(softSkillsOptions, 3),
      'Hard Skills': getRandomMultiple(hardSkillsOptions, 3),
      'Interesse Formacao': getRandomItem(interesses)
    });
  }
  return data;
};

// URL Pública da Planilha (CSV)
const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTUVD4nuwCZKthKC811nQqxsszn33sREK_Ue3Dvw_Wcl1UiUMNsaA94uXdW_bsuYlaLgSosTKJR1edP/pub?output=csv';

export const fetchDashboardData = async () => {
  return new Promise((resolve, reject) => {
    if (SPREADSHEET_CSV_URL) {
      Papa.parse(SPREADSHEET_CSV_URL, {
        download: true,
        header: true,
        complete: (results) => {
          resolve(processData(results.data));
        },
        error: (error) => {
          console.error("Error fetching data:", error);
          reject(error);
        }
      });
    } else {
      // Use dynamic mock data
      const mockData = generateMockData(178);
      resolve(processData(mockData));
    }
  });
};

export const processData = (rawData) => {
  // Filter out empty rows
  const validData = rawData.filter(row => row['Carimbo de data/hora']);
  const totalResponses = validData.length;
  
  const getValue = (row, partialKey) => {
    const key = Object.keys(row).find(k => k.toLowerCase().includes(partialKey.toLowerCase()));
    return key ? row[key] : undefined;
  };

  const countBy = (partialKey) => {
    const count = {};
    validData.forEach(row => {
      let val = getValue(row, partialKey);
      if (!val || val.trim() === '') val = 'Não Informado';
      count[val] = (count[val] || 0) + 1;
    });
    return Object.keys(count)
      .map(k => ({ name: k, value: count[k] }))
      .sort((a, b) => b.value - a.value);
  };

  const countWords = (partialKey) => {
    const wordsCount = {};
    const rawResponses = [];
    const stopWords = ['e', 'ou', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas', 'para', 'com', 'sem', 'que', 'os', 'as', 'a', 'o', 'um', 'uma'];
    validData.forEach(row => {
      const val = getValue(row, partialKey);
      if (val && typeof val === 'string' && val.trim() !== '') {
        rawResponses.push(val.trim());
        const words = val.toLowerCase().replace(/[.,!?;:()]/g, '').split(/\s+/);
        words.forEach(w => {
          if (w.length > 2 && !stopWords.includes(w)) {
            wordsCount[w] = (wordsCount[w] || 0) + 1;
          }
        });
      }
    });
    return {
      wordFrequency: Object.keys(wordsCount)
        .map(k => ({ name: k.charAt(0).toUpperCase() + k.slice(1), value: wordsCount[k] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 15),
      rawResponses
    };
  };

  // 1. ID Organizacional
  const diretoriaChart = countBy('SETOR/DIRETORIA');
  const coordenacaoChart = countBy('COORDENAÇÃO A QUE ESTÁ VINCULADO');
  const tempoAtuacaoChart = countBy('TEMPO MÉDIO DE ATUAÇÃO');
  const vinculoChart = countBy('TIPO DE VÍNCULO FUNCIONAL');
  const grupoFuncionalChart = countBy('GRUPO FUNCIONAL A QUE PERTENCE');
  const cargoComissionadoChart = countBy('EXERCE CARGO COMISSIONADO');
  const jornadaChart = countBy('JORNADA DE TRABALHO MENSAL');

  // 2. Formação Acadêmica
  const escolaridadeChart = countBy('ESCOLARIDADE MÁXIMA');
  const formacaoAreaChart = countBy('FORMAÇÃO SUPERIOR');
  const outrosCursosChart = countWords('CASO NÃO TENHA O CURSO');

  // 3. Experiência Profissional
  const atividadesCorrespondemChart = countBy('ATIVIDADES ATUAIS CORRESPONDEM A SUA QUALIFICAÇÃO');
  const atuouOutrasAreasChart = countBy('VOCÊ JÁ ATUOU EM OUTRAS ÁREAS DA SEDUC');
  const outrasAreasChart = countWords('SE SIM, QUAIS ÁREAS?');

  // 4. Clima Organizacional
  const sort5to1 = (arr) => [...arr].sort((a, b) => parseInt(b.name) - parseInt(a.name));
  const climaComunicacaoChart = sort5to1(countBy('COMUNICAÇÃO INTERNA CLARA E OBJETIVA'));
  const climaClarezaChart = sort5to1(countBy('CLAREZA DAS ATRIBUIÇÕES'));
  const climaEmpatiaChart = sort5to1(countBy('EMPATIA E COOPERAÇÃO ENTRE PARES'));
  const desafiosClimaChart = countWords('DESTAQUE AS PRINCIPAIS DESAFIOS QUE VOCÊ IDENTIFICA');

  // 5. Percepção Institucional (13 individual charts instead of averages)
  const percepcaoKeys = [
    { key: 'uma visão abrangente da instituição', label: 'Visão Abrangente da Instituição' },
    { key: 'movimentação para a atualização e estudos', label: 'Movimentação para Atualização' },
    { key: 'alinhamento da rotina de trabalho', label: 'Alinhamento da Rotina de Trabalho' },
    { key: 'disseminação de informações da área', label: 'Disseminação de Informações' },
    { key: 'compartilhar informações de forma clara', label: 'Compartilhamento Claro' },
    { key: 'soluções adequadas diante dos problemas', label: 'Propõe Soluções Adequadas' },
    { key: 'propor soluções inovadoras', label: 'Propõe Soluções Inovadoras' },
    { key: 'inspirar em exemplos de boas práticas', label: 'Inspiração em Boas Práticas' },
    { key: 'independentemente de cobranças específicas', label: 'Ação Independente (Proatividade)' },
    { key: 'protagonismo em momentos desafiadores', label: 'Protagonismo em Desafios' },
    { key: 'planeja e prioriza suas atividades', label: 'Planejamento de Atividades' },
    { key: 'aprimoramento de processos com ganhos', label: 'Aprimoramento de Processos' },
    { key: 'participar de forma ativa dos projetos', label: 'Participação Ativa em Projetos' }
  ];

  const percepcaoCharts = percepcaoKeys.map(pk => {
    const rawData = countBy(pk.key).filter(d => d.name !== 'Não Informado');
    // Força a ordem da legenda para ser 5, 4, 3, 2, 1
    rawData.sort((a, b) => parseInt(b.name) - parseInt(a.name));
    return {
      label: pk.label,
      data: rawData
    };
  });

  // 6. Competências e Habilidades
  const skillsKeys = [
    'INFORMÁTICA BÁSICA', 'PLANILHAS ELETRÔNICAS', 'FERRAMENTAS GOOGLE',
    'SISTEMAS DA SEDUC', 'PAE 4.0', 'REDAÇÃO OFICIAL E ELABORAÇÃO DE PARECER TÉCNICO',
    'RELAÇÕES INTERPESSOAIS E ATENDIMENTO AO PÚBLICO', 'GESTÃO DE PROCESSOS ADMINISTRATIVOS',
    'ANÁLISE DE DADOS E DOCUMENTAÇÃO', 'PLANEJAMENTO BASEADO EM EVIDÊNCIAS',
    'FERRAMENTAS DE INTELIGÊNCIA ARTIFICIAL', 'NOÇÕES EM LEGISLAÇÃO'
  ];

  const countSkills = (keys) => {
    const result = {};
    keys.forEach(k => result[k] = 0);
    validData.forEach(row => {
      keys.forEach(k => {
        const val = Number(getValue(row, k));
        if (!isNaN(val) && val >= 4) {
          result[k]++;
        }
      });
    });
    return Object.keys(result)
      .map(k => ({ name: k, value: result[k] }))
      .sort((a, b) => b.value - a.value);
  };
  
  const allSkillsChart = countSkills(skillsKeys);

  // 7. Necessidade de Formação
  const novosCursosChart = countBy('PRETENDE PARTICIPAR DE NOVOS CURSOS DE FORMAÇÃO');
  const perfilCursosChart = countBy('PERFIL DE CURSOS DE FORMAÇÃO QUE PRETENDE PARTICIPAR');
  
  const areasPrioritariasCount = {};
  validData.forEach(row => {
    let val = getValue(row, 'ÁREAS PRIORITÁRIAS PARA REALIZAÇÃO DE CURSOS');
    if (val) {
      val.split(',').forEach(item => {
        const trimmed = item.trim();
        if (trimmed) {
          areasPrioritariasCount[trimmed] = (areasPrioritariasCount[trimmed] || 0) + 1;
        }
      });
    }
  });
  const areasPrioritariasChart = Object.keys(areasPrioritariasCount)
    .map(k => ({ name: k, value: areasPrioritariasCount[k] }))
    .sort((a, b) => b.value - a.value);

  // Mapeamento necessário para os Filtros Globais
  const mappedData = validData.map(row => ({
    ...row,
    'Diretoria': getValue(row, 'SETOR/DIRETORIA') || 'Não Informado',
    'Coordenação': getValue(row, 'COORDENAÇÃO A QUE ESTÁ VINCULADO') || 'Não Informado'
  }));

  return {
    totalResponses,
    rawData: mappedData,
    diretoriaChart,
    coordenacaoChart,
    tempoAtuacaoChart,
    vinculoChart,
    grupoFuncionalChart,
    cargoComissionadoChart,
    jornadaChart,
    escolaridadeChart,
    formacaoAreaChart,
    outrosCursosChart,
    atividadesCorrespondemChart,
    atuouOutrasAreasChart,
    outrasAreasChart,
    climaComunicacaoChart,
    climaClarezaChart,
    climaEmpatiaChart,
    desafiosClimaChart,
    percepcaoCharts,
    allSkillsChart,
    novosCursosChart,
    perfilCursosChart,
    areasPrioritariasChart
  };
};

