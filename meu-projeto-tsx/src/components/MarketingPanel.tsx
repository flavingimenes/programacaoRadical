import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  Clock,
  Calendar,
  AlertTriangle,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import type { Event } from '../types/event';

interface MarketingAsset {
  id: string;
  type: 'logo' | 'briefing' | 'layout_digital' | 'layout_impresso' | 'fotos';
  name: string;
  status: 'aguardando_upload' | 'em_revisao' | 'aprovado' | 'rejeitado';
  uploadedAt?: Date;
  approvedAt?: Date;
  deadline: Date;
  url?: string;
}

interface MarketingDeadline {
  task: string;
  deadline: Date;
  status: 'pendente' | 'em_andamento' | 'concluido';
  priority: 'alta' | 'media' | 'baixa';
}

const generateMarketingDeadlines = (event: Event): MarketingDeadline[] => {
  const eventDate = new Date(event.startDate);
  
  return [
    {
      task: 'Receber briefing e materiais do cliente',
      deadline: new Date(eventDate.getTime() - 30 * 24 * 60 * 60 * 1000),
      status: 'concluido',
      priority: 'alta'
    },
    {
      task: 'Criar layouts digitais (redes sociais)',
      deadline: new Date(eventDate.getTime() - 25 * 24 * 60 * 60 * 1000),
      status: 'em_andamento',
      priority: 'alta'
    },
    {
      task: 'Aprovação de layouts digitais',
      deadline: new Date(eventDate.getTime() - 20 * 24 * 60 * 60 * 1000),
      status: 'pendente',
      priority: 'alta'
    },
    {
      task: 'Criar materiais impressos (banners, cartazes)',
      deadline: new Date(eventDate.getTime() - 18 * 24 * 60 * 60 * 1000),
      status: 'pendente',
      priority: 'media'
    },
    {
      task: 'Aprovação de materiais impressos',
      deadline: new Date(eventDate.getTime() - 15 * 24 * 60 * 60 * 1000),
      status: 'pendente',
      priority: 'media'
    },
    {
      task: 'Enviar para impressão',
      deadline: new Date(eventDate.getTime() - 12 * 24 * 60 * 60 * 1000),
      status: 'pendente',
      priority: 'alta'
    },
    {
      task: 'Publicar campanha digital',
      deadline: new Date(eventDate.getTime() - 10 * 24 * 60 * 60 * 1000),
      status: 'pendente',
      priority: 'alta'
    },
    {
      task: 'Receber materiais impressos',
      deadline: new Date(eventDate.getTime() - 5 * 24 * 60 * 60 * 1000),
      status: 'pendente',
      priority: 'alta'
    },
    {
      task: 'Distribuir materiais impressos',
      deadline: new Date(eventDate.getTime() - 3 * 24 * 60 * 60 * 1000),
      status: 'pendente',
      priority: 'media'
    },
    {
      task: 'Cobertura durante o evento (fotos/vídeos)',
      deadline: eventDate,
      status: 'pendente',
      priority: 'alta'
    },
    {
      task: 'Publicar conteúdo pós-evento',
      deadline: new Date(eventDate.getTime() + 2 * 24 * 60 * 60 * 1000),
      status: 'pendente',
      priority: 'baixa'
    }
  ];
};

const generateMarketingAssets = (event: Event): MarketingAsset[] => {
  const eventDate = new Date(event.startDate);
  
  return [
    {
      id: 'asset_1',
      type: 'logo',
      name: 'Logo do Evento',
      status: 'aprovado',
      uploadedAt: new Date(eventDate.getTime() - 28 * 24 * 60 * 60 * 1000),
      approvedAt: new Date(eventDate.getTime() - 27 * 24 * 60 * 60 * 1000),
      deadline: new Date(eventDate.getTime() - 30 * 24 * 60 * 60 * 1000),
      url: '#'
    },
    {
      id: 'asset_2',
      type: 'briefing',
      name: 'Briefing do Evento',
      status: 'aprovado',
      uploadedAt: new Date(eventDate.getTime() - 28 * 24 * 60 * 60 * 1000),
      deadline: new Date(eventDate.getTime() - 30 * 24 * 60 * 60 * 1000),
      url: '#'
    },
    {
      id: 'asset_3',
      type: 'layout_digital',
      name: 'Arte para Instagram - Feed',
      status: 'em_revisao',
      uploadedAt: new Date(eventDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      deadline: new Date(eventDate.getTime() - 20 * 24 * 60 * 60 * 1000),
      url: '#'
    },
    {
      id: 'asset_4',
      type: 'layout_digital',
      name: 'Arte para Instagram - Stories',
      status: 'em_revisao',
      uploadedAt: new Date(eventDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      deadline: new Date(eventDate.getTime() - 20 * 24 * 60 * 60 * 1000),
      url: '#'
    },
    {
      id: 'asset_5',
      type: 'layout_impresso',
      name: 'Banner 2x1m',
      status: 'aguardando_upload',
      deadline: new Date(eventDate.getTime() - 15 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'asset_6',
      type: 'layout_impresso',
      name: 'Cartaz A3',
      status: 'aguardando_upload',
      deadline: new Date(eventDate.getTime() - 15 * 24 * 60 * 60 * 1000)
    }
  ];
};

const statusColors = {
  aguardando_upload: 'bg-slate-500',
  em_revisao: 'bg-yellow-500',
  aprovado: 'bg-green-500',
  rejeitado: 'bg-red-500'
};

const statusLabels = {
  aguardando_upload: 'Aguardando Upload',
  em_revisao: 'Em Revisão',
  aprovado: 'Aprovado',
  rejeitado: 'Rejeitado'
};

const priorityColors = {
  alta: 'text-red-600',
  media: 'text-yellow-600',
  baixa: 'text-blue-600'
};

export function MarketingPanel({ event }: { event: Event }) {
  const [assets, setAssets] = useState<MarketingAsset[]>(generateMarketingAssets(event));
  const [deadlines] = useState<MarketingDeadline[]>(generateMarketingDeadlines(event));

  const handleUpload = (assetId: string) => {
    setAssets(assets.map(asset => 
      asset.id === assetId 
        ? { ...asset, status: 'em_revisao', uploadedAt: new Date() }
        : asset
    ));
    toast.success('Arquivo enviado com sucesso!');
  };

  const handleApproval = (assetId: string, approved: boolean) => {
    setAssets(assets.map(asset => 
      asset.id === assetId 
        ? { 
            ...asset, 
            status: approved ? 'aprovado' : 'rejeitado',
            approvedAt: approved ? new Date() : undefined
          }
        : asset
    ));
    toast.success(approved ? 'Material aprovado!' : 'Material rejeitado');
  };

  const isOverdue = (deadline: Date) => new Date() > deadline;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="assets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assets">Materiais</TabsTrigger>
          <TabsTrigger value="deadlines">Cronograma</TabsTrigger>
          <TabsTrigger value="briefing">Briefing</TabsTrigger>
        </TabsList>

        {/* Materiais Tab */}
        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Materiais</CardTitle>
              <CardDescription>
                Upload de logos, briefings e aprovação de layouts para {event.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assets.map((asset) => {
                const overdue = asset.status === 'aguardando_upload' && isOverdue(asset.deadline);
                
                return (
                  <div 
                    key={asset.id}
                    className={`border rounded-lg p-4 ${
                      overdue ? 'border-red-300 bg-red-50' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {asset.type === 'logo' || asset.type.includes('layout') ? (
                          <ImageIcon className="w-5 h-5 text-slate-500" />
                        ) : (
                          <FileText className="w-5 h-5 text-slate-500" />
                        )}
                        <div>
                          <h3 className="text-slate-900">{asset.name}</h3>
                          <p className="text-slate-600">
                            Prazo: {asset.deadline.toLocaleDateString('pt-BR')}
                            {overdue && ' - ATRASADO'}
                          </p>
                        </div>
                      </div>
                      <Badge className={statusColors[asset.status]}>
                        {statusLabels[asset.status]}
                      </Badge>
                    </div>

                    {asset.status === 'aguardando_upload' && (
                      <Button 
                        onClick={() => handleUpload(asset.id)}
                        className="w-full gap-2"
                        variant={overdue ? 'destructive' : 'default'}
                      >
                        <Upload className="w-4 h-4" />
                        Fazer Upload
                      </Button>
                    )}

                    {asset.status === 'em_revisao' && (
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleApproval(asset.id, true)}
                          className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Aprovar
                        </Button>
                        <Button 
                          onClick={() => handleApproval(asset.id, false)}
                          variant="destructive"
                          className="flex-1"
                        >
                          Reprovar
                        </Button>
                      </div>
                    )}

                    {(asset.status === 'aprovado' || asset.status === 'em_revisao') && asset.url && (
                      <Button variant="outline" className="w-full gap-2 mt-2">
                        <Download className="w-4 h-4" />
                        Baixar Arquivo
                      </Button>
                    )}

                    {asset.uploadedAt && (
                      <p className="text-slate-600 mt-2">
                        Enviado em: {asset.uploadedAt.toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deadlines Tab */}
        <TabsContent value="deadlines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cronograma de Produção</CardTitle>
              <CardDescription>
                Prazos automáticos baseados na data do evento ({event.startDate.toLocaleDateString('pt-BR')})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deadlines.map((deadline, index) => {
                  const overdue = deadline.status !== 'concluido' && isOverdue(deadline.deadline);
                  
                  return (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        deadline.status === 'concluido'
                          ? 'bg-green-50 border-green-200'
                          : overdue
                            ? 'bg-red-50 border-red-200'
                            : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-slate-900 ${deadline.status === 'concluido' ? 'line-through text-slate-500' : ''}`}>
                            {deadline.task}
                          </h4>
                          <Badge 
                            variant="outline" 
                            className={priorityColors[deadline.priority]}
                          >
                            {deadline.priority}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {deadline.deadline.toLocaleDateString('pt-BR')}
                            {overdue && ' - ATRASADO'}
                          </span>
                        </div>
                      </div>

                      {deadline.status === 'concluido' && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                      {deadline.status === 'em_andamento' && (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      )}
                      {overdue && deadline.status !== 'concluido' && (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Briefing Tab */}
        <TabsContent value="briefing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Briefing do Evento</CardTitle>
              <CardDescription>
                Informações e diretrizes para criação dos materiais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Objetivo do Evento</Label>
                <Textarea 
                  defaultValue={event.description}
                  rows={3}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Público-Alvo</Label>
                  <Textarea 
                    defaultValue="Alunos, professores e profissionais da área"
                    rows={2}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tom de Comunicação</Label>
                  <Textarea 
                    defaultValue="Profissional, acadêmico, inspirador"
                    rows={2}
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cores Institucionais</Label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-blue-600"></div>
                    <span className="text-slate-600">#2563EB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-purple-600"></div>
                    <span className="text-slate-600">#9333EA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-800"></div>
                    <span className="text-slate-600">#1E293B</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Elementos Obrigatórios</Label>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Logo UNIVAG</li>
                  <li>Data e horário do evento</li>
                  <li>Local de realização</li>
                  <li>Informações de contato/inscrição</li>
                </ul>
              </div>

              <div className="space-y-2">
                <Label>Canais de Divulgação</Label>
                <div className="flex gap-2 flex-wrap">
                  {event.marketingAssets?.digital && (
                    <Badge>Redes Sociais</Badge>
                  )}
                  {event.marketingAssets?.print && (
                    <Badge>Impressos</Badge>
                  )}
                  {event.marketingAssets?.social && (
                    <Badge>Site Institucional</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
