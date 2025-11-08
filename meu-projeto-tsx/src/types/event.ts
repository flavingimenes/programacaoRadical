export type EventStatus = 'rascunho' | 'aguardando_pro_reitoria' | 'aguardando_cerimonial' | 'aguardando_audiovisual' | 'aguardando_marketing' | 'aprovado' | 'em_execucao' | 'concluido' | 'cancelado';

export type EventType = 'academico' | 'institucional' | 'cultural' | 'extensao' | 'cientifico';

export type Department = 'pro_reitoria' | 'cerimonial' | 'audiovisual' | 'marketing';

export interface Resource {
  id: string;
  name: string;
  type: 'sala' | 'equipamento' | 'material';
  available: boolean;
  location?: string;
}

export interface ApprovalStep {
  department: Department;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  approvedBy?: string;
  approvedAt?: Date;
  notes?: string;
}

export interface Event {
  id: string;
  title: string;
  type: EventType;
  description: string;
  requestedBy: string;
  department: string;
  startDate: Date;
  endDate: Date;
  location: string;
  expectedAttendees: number;
  status: EventStatus;
  resources: Resource[];
  approvals: ApprovalStep[];
  requiresCeremony: boolean;
  requiresAudiovisual: boolean;
  requiresMarketing: boolean;
  marketingAssets?: {
    digital: boolean;
    print: boolean;
    social: boolean;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
