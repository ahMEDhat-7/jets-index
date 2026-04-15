import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import AdminLayout from '../../components/admin/AdminLayout';
import DeleteConfirmDialog from '../../components/admin/DeleteConfirmDialog';
import { useAuthStore } from '../../store/useAuthStore';
import type { Country } from '../../types';
import { fetchCountries, createCountry, updateCountry, deleteCountry, type CreateCountryData } from '../../lib/api';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';

export default function CountriesPage() {
  const { token } = useAuthStore();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);
  const [formData, setFormData] = useState<CreateCountryData>({ name: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    setLoading(true);
    const data = await fetchCountries();
    setCountries(data);
    setLoading(false);
  };

  const handleOpenCreate = () => {
    setEditingCountry(null);
    setFormData({ name: '' });
    setDialogOpen(true);
  };

  const handleOpenEdit = (country: Country) => {
    setEditingCountry(country);
    setFormData({ name: country.name });
    setDialogOpen(true);
  };

  const handleOpenDelete = (country: Country) => {
    setDeletingCountry(country);
    setDeleteOpen(true);
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    if (editingCountry) {
      await updateCountry(token, editingCountry.id, formData);
    } else {
      await createCountry(token, formData);
    }
    setSaving(false);
    setDialogOpen(false);
    loadCountries();
  };

  const handleDelete = async () => {
    if (!token || !deletingCountry) return;
    await deleteCountry(token, deletingCountry.id);
    loadCountries();
    setDeletingCountry(null);
  };

  if (loading) {
    return (
      <AdminLayout title="Countries">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-[hsl(var(--muted-foreground))]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Countries">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[hsl(var(--muted-foreground))]">{countries.length} countries</p>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Country
        </button>
      </div>

      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[hsl(var(--muted))]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Name</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-[hsl(var(--muted-foreground))]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {countries.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]">
                  No countries yet
                </td>
              </tr>
            ) : (
              countries.map((country) => (
                <tr key={country.id} className="hover:bg-[hsl(var(--muted))]">
                  <td className="px-4 py-3 text-[hsl(var(--card-foreground))]">{country.name}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(country)}
                        className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] rounded hover:bg-[hsl(var(--muted))]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(country)}
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
              {editingCountry ? 'Edit Country' : 'Create Country'}
            </Dialog.Title>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
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
                disabled={saving || !formData.name}
                className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingCountry ? 'Update' : 'Create'}
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
        title="Delete Country"
        description={`Are you sure you want to delete "${deletingCountry?.name}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}