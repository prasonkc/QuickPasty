import React, { useState } from 'react';
import { Plus, Copy, Trash2, Clock } from 'lucide-react';

interface Paste {
  id: number;
  title: string;
  content: string;
  timestamp: string;
}

interface PasteSidebarProps {
  pastes: Paste[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const PasteSidebar: React.FC<PasteSidebarProps> = ({ pastes, selectedId, onSelect, onAdd, onDelete }) => {
  return (
    <div className="w-80 h-screen bg-[--color-card] border-r border-[--color-border] flex flex-col">
      <div className="p-4 border-b border-[--color-border]">
        <h1 className="text-2xl font-bold text-[--color-foreground] mb-4">Pastebin</h1>
        <button
          onClick={onAdd}
          className="w-full bg-[--color-primary] hover:bg-[--color-secondary] text-[--color-foreground] font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} />
          New Paste
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {pastes.length === 0 ? (
          <div className="text-center text-[--color-foreground-muted] mt-8 px-4">
            No pastes yet. Click "New Paste" to create one.
          </div>
        ) : (
          pastes.map((paste) => (
            <div
              key={paste.id}
              onClick={() => onSelect(paste.id)}
              className={`mb-2 p-3 rounded-lg cursor-pointer transition-all ${
                selectedId === paste.id
                  ? 'bg-[--color-primary] bg-opacity-20 border border-[--color-primary]'
                  : 'bg-[--color-background] border border-[--color-border] hover:border-[--color-primary] hover:border-opacity-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-medium text-[--color-foreground] truncate flex-1">
                  {paste.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(paste.id);
                  }}
                  className="text-[--color-foreground-muted] hover:text-[--color-negative] transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-[--color-foreground-muted] line-clamp-2 mb-2">
                {paste.content || 'Empty paste'}
              </p>
              <div className="flex items-center gap-1 text-xs text-[--color-foreground-muted]">
                <Clock size={12} />
                {paste.timestamp}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

interface PasteViewerProps {
  paste: Paste | undefined;
  onUpdate: (id: number, title: string, content: string) => void;
}

const PasteViewer: React.FC<PasteViewerProps> = ({ paste, onUpdate }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');

  const handleEdit = (): void => {
    if (!paste) return;
    setEditTitle(paste.title);
    setEditContent(paste.content);
    setIsEditing(true);
  };

  const handleSave = (): void => {
    if (!paste) return;
    onUpdate(paste.id, editTitle, editContent);
    setIsEditing(false);
  };

  const handleCopy = async (): Promise<void> => {
    if (!paste) return;
    await navigator.clipboard.writeText(paste.content);
  };

  if (!paste) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[--color-background]">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-[--color-foreground] mb-2">No paste selected</h2>
          <p className="text-[--color-foreground-muted]">Select a paste from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[--color-background] h-screen">
      <div className="border-b border-[--color-border] p-4 bg-[--color-card]">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="text-2xl font-bold bg-[--color-background] text-[--color-foreground] border border-[--color-border] rounded px-3 py-1 w-full focus:outline-none focus:border-[--color-primary]"
            placeholder="Paste title"
          />
        ) : (
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[--color-foreground]">{paste.title}</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-[--color-background] text-[--color-foreground] border border-[--color-border] rounded-lg hover:border-[--color-primary] transition-colors flex items-center gap-2"
              >
                <Copy size={16} />
                Copy
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-[--color-primary] text-[--color-foreground] rounded-lg hover:bg-[--color-secondary] transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 mt-2 text-sm text-[--color-foreground-muted]">
          <Clock size={14} />
          {paste.timestamp}
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-4">
        {isEditing ? (
          <div className="h-full flex flex-col gap-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="flex-1 bg-[--color-card] text-[--color-foreground] border border-[--color-border] rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-[--color-primary] resize-none"
              placeholder="Paste your content here..."
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-[--color-background] text-[--color-foreground] border border-[--color-border] rounded-lg hover:border-[--color-border] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[--color-positive] text-[--color-background] rounded-lg hover:opacity-90 transition-opacity"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <pre className="bg-[--color-card] text-[--color-foreground] border border-[--color-border] rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-words">
              {paste.content}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

const PastebinApp: React.FC = () => {
  const [pastes, setPastes] = useState<Paste[]>([
    {
      id: 1,
      title: 'Welcome to Pastebin',
      content: 'This is your first paste!\n\nYou can create new pastes, edit existing ones, and copy their content to your clipboard.\n\nClick "New Paste" to get started.',
      timestamp: 'Just now'
    }
  ]);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [nextId, setNextId] = useState<number>(2);

  const handleAddPaste = (): void => {
    const newPaste: Paste = {
      id: nextId,
      title: `Untitled Paste ${nextId}`,
      content: '',
      timestamp: 'Just now'
    };
    setPastes([newPaste, ...pastes]);
    setSelectedId(newPaste.id);
    setNextId(nextId + 1);
  };

  const handleDeletePaste = (id: number): void => {
    setPastes(pastes.filter(p => p.id !== id));
    if (selectedId === id) {
      setSelectedId(pastes.length > 1 ? pastes[0].id : null);
    }
  };

  const handleUpdatePaste = (id: number, title: string, content: string): void => {
    setPastes(pastes.map(p => 
      p.id === id ? { ...p, title, content, timestamp: 'Just now' } : p
    ));
  };

  const selectedPaste = pastes.find(p => p.id === selectedId);

  return (
    <div className="flex h-screen bg-[--color-background] text-[--color-foreground]" style={{
      '--color-background': '#0B0A16',
      '--color-foreground': '#E6E6F8',
      '--color-foreground-muted': '#A3A1C2',
      '--color-primary': '#5B4BFF',
      '--color-secondary': '#8E6CFF',
      '--color-card': '#151428',
      '--color-border': '#23223A',
      '--color-positive': '#3BE8B0',
      '--color-negative': '#FF5E8E'
    } as React.CSSProperties}>
      <PasteSidebar
        pastes={pastes}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onAdd={handleAddPaste}
        onDelete={handleDeletePaste}
      />
      <PasteViewer
        paste={selectedPaste}
        onUpdate={handleUpdatePaste}
      />
    </div>
  );
};

export default PastebinApp;