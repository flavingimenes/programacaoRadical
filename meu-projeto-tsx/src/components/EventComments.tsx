import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { MessageSquare, Send, Bell } from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: string;
  department: string;
  message: string;
  timestamp: Date;
  isNotification?: boolean;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Dr. Carlos Santos',
    department: 'Pró-Reitoria',
    message: 'Solicitação aprovada. Pode prosseguir com as próximas etapas.',
    timestamp: new Date('2025-11-01T10:30:00'),
    isNotification: true
  },
  {
    id: '2',
    author: 'Ana Paula',
    department: 'Cerimonial',
    message: 'Precisamos confirmar a disponibilidade do Auditório Principal. Já entrei em contato com a administração.',
    timestamp: new Date('2025-11-02T14:15:00')
  },
  {
    id: '3',
    author: 'Ricardo Tech',
    department: 'Audiovisual',
    message: 'Os equipamentos solicitados estão reservados. Faremos um teste técnico 2 dias antes do evento.',
    timestamp: new Date('2025-11-03T09:00:00'),
    isNotification: true
  },
  {
    id: '4',
    author: 'Laura Marketing',
    department: 'Marketing',
    message: 'Estamos aguardando o logo do evento para iniciar a produção dos materiais digitais.',
    timestamp: new Date('2025-11-04T11:45:00')
  },
  {
    id: '5',
    author: 'Prof. João Silva',
    department: 'Engenharia Civil',
    message: 'Logo enviado! Podem começar a produção.',
    timestamp: new Date('2025-11-05T08:20:00')
  }
];

export function EventComments({ eventId }: { eventId: string }) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');

  const handleSendComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'João Silva',
      department: 'Coordenador',
      message: newComment,
      timestamp: new Date()
    };

    setComments([...comments, comment]);
    setNewComment('');
    
    // Simular notificação para outros setores
    toast.success('Comentário enviado!', {
      description: 'Os setores envolvidos foram notificados.'
    });
  };

  const departmentColors: Record<string, string> = {
    'Pró-Reitoria': 'bg-blue-500',
    'Cerimonial': 'bg-purple-500',
    'Audiovisual': 'bg-orange-500',
    'Marketing': 'bg-pink-500',
    'Coordenador': 'bg-green-500',
    'Engenharia Civil': 'bg-slate-500'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Comunicação e Notificações
        </CardTitle>
        <CardDescription>
          Chat centralizado para comunicação entre setores
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Comments List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <div 
              key={comment.id}
              className={`p-3 rounded-lg border ${
                comment.isNotification 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    {comment.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-slate-900">{comment.author}</div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`${departmentColors[comment.department]} text-white border-0`}
                      >
                        {comment.department}
                      </Badge>
                      {comment.isNotification && (
                        <Bell className="w-3 h-3 text-blue-600" />
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-slate-500">
                  {comment.timestamp.toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="text-slate-700 pl-10">
                {comment.message}
              </p>
            </div>
          ))}
        </div>

        {/* New Comment */}
        <div className="space-y-2 pt-4 border-t">
          <Textarea
            placeholder="Digite sua mensagem ou atualização sobre o evento..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <div className="flex justify-between items-center">
            <p className="text-slate-600">
              Os setores envolvidos serão notificados automaticamente
            </p>
            <Button 
              onClick={handleSendComment}
              disabled={!newComment.trim()}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Enviar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
