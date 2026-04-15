import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import AdminLayout from '../../components/admin/AdminLayout';
import DeleteConfirmDialog from '../../components/admin/DeleteConfirmDialog';
import { useAuthStore } from '../../store/useAuthStore';
import type { Category } from '../../types';
import { fetchCategories, createCategory, updateCategory, deleteCategory, type CreateCategoryData } from '../../lib/api';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';

export default function CategoriesPage() {
  const { token } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CreateCategoryData>({ categoryName: '', categoryDomain: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const data = await fetchCategories();
    setCategories(data);
    setLoading(false);
  };

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormData({ categoryName: '', categoryDomain: '' });
    setDialogOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ categoryName: category.categoryName, categoryDomain: category.categoryDomain || '' });
    setDialogOpen(true);
  };

  const handleOpenDelete = (category: Category) => {
    setDeletingCategory(category);
    setDeleteOpen(true);
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    if (editingCategory) {
      await updateCategory(token, editingCategory.id, formData);
    } else {
      await createCategory(token, formData);
    }
    setSaving(false);
    setDialogOpen(false);
    loadCategories();
  };

  const handleDelete = async () => {
    if (!token || !deletingCategory) return;
    await deleteCategory(token, deletingCategory.id);
    loadCategories();
    setDeletingCategory(null);
  };

  if (loading) {
    return (
      <AdminLayout title="Categories">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-[hsl(var(--muted-foreground))]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Categories">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[hsl(var(--muted-foreground))]">{categories.length} categories</p>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[hsl(var(--muted))]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Domain</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-[hsl(var(--muted-foreground))]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]">
                  No categories yet
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-[hsl(var(--muted))]">
                  <td className="px-4 py-3 text-[hsl(var(--card-foreground))]">{category.categoryName}</td>
                  <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{category.categoryDomain || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(category)}
                        className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] rounded hover:bg-[hsl(var(--muted))]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(category)}
                        className="p-2 text-[hsl(var(--muted-foreground))] hover:text-red-600 rounded hover:bg-[hsl(var(--muted))]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--card))] rounded-xl p-6 w-full max-w-md shadow-xl border border-[hsl(var(--border))] z-50">
            <Dialog.Title className="text-lg font-semibold text-[hsl(var(--card-foreground))] mb-4">
              {editingCategory ? 'Edit Category' : 'Create Category'}
            </Dialog.Title>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.categoryName}
                  onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Domain</label>
                <input
                  type="text"
                  value={formData.categoryDomain}
                  onChange={(e) => setFormData({ ...formData, categoryDomain: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Dialog.Close asChild>
                <button className="px-4 py-2 text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--muted))] rounded-lg">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                onClick={handleSave}
                disabled={saving || !formData.categoryName}
                className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
              </button>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-3 right-3 p-1 text-[hsl(var(--muted-foreground))] rounded" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${deletingCategory?.categoryName}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}