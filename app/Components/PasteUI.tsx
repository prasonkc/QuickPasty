import React from 'react'
import { Plus, Trash2, Clock } from 'lucide-react';

interface Paste {
  id: number;
  title: string;
  content: string;
  timestamp: string;
}

interface PasteUIProps {
  pastes: Paste[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const PasteUI: React.FC<PasteUIProps> = ({ pastes, selectedId, onSelect, onAdd, onDelete }) => {
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
  )
}

export default PasteUI