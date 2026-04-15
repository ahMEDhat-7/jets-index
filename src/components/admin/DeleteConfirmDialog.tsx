import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--card))] rounded-xl p-6 w-full max-w-md shadow-xl border border-[hsl(var(--border))] z-50">
          <Dialog.Title className="text-lg font-semibold text-[hsl(var(--card-foreground))] mb-2">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-[hsl(var(--muted-foreground))] mb-4">
            {description}
          </Dialog.Description>
          <div className="flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--muted))] rounded-lg transition-colors">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 p-1 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] rounded"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}