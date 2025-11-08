import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Send } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

export function EventForm() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [requiresCeremony, setRequiresCeremony] = useState(false);
  const [requiresAudiovisual, setRequiresAudiovisual] = useState(false);
  const [requiresMarketing, setRequiresMarketing] = useState(false);
  const [marketingDigital, setMarketingDigital] = useState(false);
  const [marketingPrint, setMarketingPrint] = useState(false);
  const [marketingSocial, setMarketingSocial] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Solicitação enviada com sucesso!', {
      description: 'Seu evento foi registrado e enviado para análise da Pró-Reitoria.'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Solicitação de Evento</CardTitle>
        <CardDescription>
          Preencha as informações do evento para iniciar o processo de aprovação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Evento *</Label>
              <Input id="title" placeholder="Ex: Semana Acadêmica 2025" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Evento *</Label>
              <Select required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academico">Acadêmico</SelectItem>
                  <SelectItem value="institucional">Institucional</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="extensao">Extensão</SelectItem>
                  <SelectItem value="cientifico">Científico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição do Evento *</Label>
            <Textarea 
              id="description" 
              placeholder="Descreva os objetivos, atividades planejadas e público-alvo do evento..."
              rows={4}
              required
            />
          </div>

          {/* Date and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Início *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP', { locale: ptBR }) : 'Selecione a data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Data de Término *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP', { locale: ptBR }) : 'Selecione a data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Local *</Label>
              <Input id="location" placeholder="Ex: Auditório Principal" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendees">Público Esperado *</Label>
              <Input id="attendees" type="number" placeholder="Ex: 200" required />
            </div>
          </div>

          {/* Department Requirements */}
          <div className="space-y-4 border border-slate-200 rounded-lg p-4">
            <h3 className="text-slate-900">Setores Necessários</h3>
            <p className="text-slate-600">Selecione os setores que precisarão apoiar este evento</p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ceremony" 
                  checked={requiresCeremony}
                  onCheckedChange={(checked) => setRequiresCeremony(checked as boolean)}
                />
                <Label htmlFor="ceremony" className="cursor-pointer">
                  Cerimonial (organização de cerimônias, recepção, protocolo)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="audiovisual" 
                  checked={requiresAudiovisual}
                  onCheckedChange={(checked) => setRequiresAudiovisual(checked as boolean)}
                />
                <Label htmlFor="audiovisual" className="cursor-pointer">
                  Audiovisual (equipamentos, transmissão, gravação)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="marketing" 
                  checked={requiresMarketing}
                  onCheckedChange={(checked) => setRequiresMarketing(checked as boolean)}
                />
                <Label htmlFor="marketing" className="cursor-pointer">
                  Marketing (divulgação e materiais gráficos)
                </Label>
              </div>
            </div>
          </div>

          {/* Marketing Assets */}
          {requiresMarketing && (
            <div className="space-y-4 border border-slate-200 rounded-lg p-4 bg-slate-50">
              <h3 className="text-slate-900">Materiais de Marketing</h3>
              <p className="text-slate-600">Selecione os tipos de material necessários</p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="digital" 
                    checked={marketingDigital}
                    onCheckedChange={(checked) => setMarketingDigital(checked as boolean)}
                  />
                  <Label htmlFor="digital" className="cursor-pointer">
                    Digital (artes para redes sociais, banners web, email marketing)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="print" 
                    checked={marketingPrint}
                    onCheckedChange={(checked) => setMarketingPrint(checked as boolean)}
                  />
                  <Label htmlFor="print" className="cursor-pointer">
                    Impresso (cartazes, banners físicos, folders)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="social" 
                    checked={marketingSocial}
                    onCheckedChange={(checked) => setMarketingSocial(checked as boolean)}
                  />
                  <Label htmlFor="social" className="cursor-pointer">
                    Gestão de Mídias Sociais (cobertura ao vivo, stories, posts)
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Observações Adicionais</Label>
            <Textarea 
              id="notes" 
              placeholder="Informações complementares, requisitos especiais, palestrantes confirmados, etc..."
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 gap-2">
              <Send className="w-4 h-4" />
              Enviar Solicitação
            </Button>
            <Button type="button" variant="outline">
              Salvar Rascunho
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
