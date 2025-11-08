import { Event, Resource } from '../types/event.ts';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Semana de Engenharia 2025',
    type: 'academico',
    description: 'Evento anual com palestras, workshops e feira de projetos dos alunos de engenharia.',
    requestedBy: 'Prof. João Silva',
    department: 'Engenharia Civil',
    startDate: new Date('2025-11-15'),
    endDate: new Date('2025-11-19'),
    location: 'Auditório Principal + Labs',
    expectedAttendees: 450,
    status: 'aguardando_cerimonial',
    resources: [
      { id: 'r1', name: 'Auditório Principal', type: 'sala', available: true, location: 'Bloco A' },
      { id: 'r2', name: 'Projetor 4K', type: 'equipamento', available: true },
      { id: 'r3', name: 'Sistema de Som', type: 'equipamento', available: true }
    ],
    approvals: [
      { department: 'pro_reitoria', status: 'aprovado', approvedBy: 'Dr. Carlos Santos', approvedAt: new Date('2025-11-01') },
      { department: 'cerimonial', status: 'pendente' },
      { department: 'audiovisual', status: 'pendente' },
      { department: 'marketing', status: 'pendente' }
    ],
    requiresCeremony: true,
    requiresAudiovisual: true,
    requiresMarketing: true,
    marketingAssets: {
      digital: true,
      print: true,
      social: true
    },
    createdAt: new Date('2025-10-25'),
    updatedAt: new Date('2025-11-01')
  },
  {
    id: '2',
    title: 'Colação de Grau - Medicina',
    type: 'institucional',
    description: 'Cerimônia de formatura da turma 2025/2 do curso de Medicina.',
    requestedBy: 'Prof. Maria Oliveira',
    department: 'Medicina',
    startDate: new Date('2025-12-18'),
    endDate: new Date('2025-12-18'),
    location: 'Teatro Municipal',
    expectedAttendees: 800,
    status: 'aguardando_marketing',
    resources: [
      { id: 'r4', name: 'Teatro Municipal', type: 'sala', available: true, location: 'Externo' },
      { id: 'r5', name: 'Câmeras Profissionais', type: 'equipamento', available: true }
    ],
    approvals: [
      { department: 'pro_reitoria', status: 'aprovado', approvedBy: 'Dr. Carlos Santos', approvedAt: new Date('2025-10-20') },
      { department: 'cerimonial', status: 'aprovado', approvedBy: 'Ana Paula', approvedAt: new Date('2025-10-25') },
      { department: 'audiovisual', status: 'aprovado', approvedBy: 'Ricardo Tech', approvedAt: new Date('2025-10-26') },
      { department: 'marketing', status: 'pendente' }
    ],
    requiresCeremony: true,
    requiresAudiovisual: true,
    requiresMarketing: true,
    marketingAssets: {
      digital: true,
      print: true,
      social: true
    },
    createdAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-10-26')
  },
  {
    id: '3',
    title: 'Workshop: Inteligência Artificial Aplicada',
    type: 'extensao',
    description: 'Workshop sobre aplicações práticas de IA no mercado de trabalho.',
    requestedBy: 'Prof. Roberto Lima',
    department: 'Ciência da Computação',
    startDate: new Date('2025-11-22'),
    endDate: new Date('2025-11-22'),
    location: 'Lab de Informática 3',
    expectedAttendees: 60,
    status: 'aprovado',
    resources: [
      { id: 'r6', name: 'Lab de Informática 3', type: 'sala', available: true, location: 'Bloco C' },
      { id: 'r7', name: 'Notebooks (20 un)', type: 'equipamento', available: true }
    ],
    approvals: [
      { department: 'pro_reitoria', status: 'aprovado', approvedBy: 'Dr. Carlos Santos', approvedAt: new Date('2025-11-02') },
      { department: 'cerimonial', status: 'aprovado', approvedBy: 'Ana Paula', approvedAt: new Date('2025-11-03') },
      { department: 'audiovisual', status: 'aprovado', approvedBy: 'Ricardo Tech', approvedAt: new Date('2025-11-03') },
      { department: 'marketing', status: 'aprovado', approvedBy: 'Laura Marketing', approvedAt: new Date('2025-11-04') }
    ],
    requiresCeremony: false,
    requiresAudiovisual: true,
    requiresMarketing: true,
    marketingAssets: {
      digital: true,
      print: false,
      social: true
    },
    createdAt: new Date('2025-10-28'),
    updatedAt: new Date('2025-11-04')
  },
  {
    id: '4',
    title: 'Simpósio de Pesquisa Científica',
    type: 'cientifico',
    description: 'Apresentação dos trabalhos de iniciação científica desenvolvidos no ano.',
    requestedBy: 'Prof. Fernanda Costa',
    department: 'Pró-Reitoria de Pesquisa',
    startDate: new Date('2025-12-05'),
    endDate: new Date('2025-12-06'),
    location: 'Campus Completo',
    expectedAttendees: 300,
    status: 'aguardando_audiovisual',
    resources: [
      { id: 'r8', name: 'Auditório Principal', type: 'sala', available: false, location: 'Bloco A' },
      { id: 'r9', name: 'Salas 201-210', type: 'sala', available: true, location: 'Bloco B' }
    ],
    approvals: [
      { department: 'pro_reitoria', status: 'aprovado', approvedBy: 'Dr. Carlos Santos', approvedAt: new Date('2025-11-05') },
      { department: 'cerimonial', status: 'aprovado', approvedBy: 'Ana Paula', approvedAt: new Date('2025-11-06') },
      { department: 'audiovisual', status: 'pendente' },
      { department: 'marketing', status: 'pendente' }
    ],
    requiresCeremony: true,
    requiresAudiovisual: true,
    requiresMarketing: true,
    marketingAssets: {
      digital: true,
      print: true,
      social: true
    },
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2025-11-06')
  }
];

export const mockResources: Resource[] = [
  { id: 'r1', name: 'Auditório Principal', type: 'sala', available: true, location: 'Bloco A' },
  { id: 'r2', name: 'Auditório Secundário', type: 'sala', available: true, location: 'Bloco B' },
  { id: 'r3', name: 'Sala de Conferências 1', type: 'sala', available: true, location: 'Bloco A' },
  { id: 'r4', name: 'Sala de Conferências 2', type: 'sala', available: false, location: 'Bloco A' },
  { id: 'r5', name: 'Lab de Informática 1', type: 'sala', available: true, location: 'Bloco C' },
  { id: 'r6', name: 'Lab de Informática 2', type: 'sala', available: true, location: 'Bloco C' },
  { id: 'r7', name: 'Lab de Informática 3', type: 'sala', available: false, location: 'Bloco C' },
  { id: 'r8', name: 'Pátio Central', type: 'sala', available: true, location: 'Externo' },
  { id: 'r9', name: 'Projetor 4K (5 un)', type: 'equipamento', available: true },
  { id: 'r10', name: 'Sistema de Som Completo', type: 'equipamento', available: true },
  { id: 'r11', name: 'Microfones sem fio (10 un)', type: 'equipamento', available: true },
  { id: 'r12', name: 'Câmeras Profissionais (2 un)', type: 'equipamento', available: false },
  { id: 'r13', name: 'Notebooks (20 un)', type: 'equipamento', available: true },
  { id: 'r14', name: 'Telão LED Grande', type: 'equipamento', available: true },
  { id: 'r15', name: 'Estrutura de Palco', type: 'material', available: true },
  { id: 'r16', name: 'Cadeiras (500 un)', type: 'material', available: true },
  { id: 'r17', name: 'Mesas (50 un)', type: 'material', available: true },
  { id: 'r18', name: 'Banners e Stands', type: 'material', available: true }
];
