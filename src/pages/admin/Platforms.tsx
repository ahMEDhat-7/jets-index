import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import AdminLayout from '../../components/admin/AdminLayout';
import DeleteConfirmDialog from '../../components/admin/DeleteConfirmDialog';
import { useAuthStore } from '../../store/useAuthStore';
import type { Platform, Category, Manufacturer, Country } from '../../types';
import { fetchPlatforms, fetchCategories, fetchCountries, fetchManufacturers, createPlatform, updatePlatform, deletePlatform, type CreatePlatformData } from '../../lib/api';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';

export default function PlatformsPage() {
  const { token } = useAuthStore();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [deletingPlatform, setDeletingPlatform] = useState<Platform | null>(null);
  const [formData, setFormData] = useState<CreatePlatformData>({
    name: '',
    description: '',
    unitCostUsd: undefined,
    operationalStatus: '',
    imageUrl: '',
    categoryId: '',
    manufacturerId: '',
    countryId: '',
    technicalSpecs: {},
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [platformsData, categoriesData, manufacturersData, countriesData] = await Promise.all([
      fetchPlatforms(),
      fetchCategories(),
      fetchManufacturers(),
      fetchCountries(),
    ]);
    setPlatforms(platformsData);
    setCategories(categoriesData);
    setManufacturers(manufacturersData);
    setCountries(countriesData);
    setLoading(false);
  };

  const handleOpenCreate = () => {
    setEditingPlatform(null);
    setFormData({
      name: '',
      description: '',
      unitCostUsd: undefined,
      operationalStatus: '',
      imageUrl: '',
      categoryId: categories[0]?.id || '',
      manufacturerId: manufacturers[0]?.id || '',
      countryId: countries[0]?.id || '',
      technicalSpecs: {},
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (platform: Platform) => {
    setEditingPlatform(platform);
    const specs = platform.technicalSpecs 
      ? Object.fromEntries(
          Object.entries(platform.technicalSpecs).map(([k, v]) => [k, String(v ?? '')])
        )
      : {};
    setFormData({
      name: platform.name,
      description: platform.description || '',
      unitCostUsd: platform.unitCostUsd,
      operationalStatus: platform.operationalStatus || '',
      imageUrl: platform.imageUrl || '',
      categoryId: platform.category?.id || '',
      manufacturerId: platform.manufacturer?.id || '',
      countryId: platform.country?.id || '',
      technicalSpecs: specs,
    });
    setDialogOpen(true);
  };

  const handleOpenDelete = (platform: Platform) => {
    setDeletingPlatform(platform);
    setDeleteOpen(true);
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    const data = {
      ...formData,
      categoryId: formData.categoryId || undefined,
      manufacturerId: formData.manufacturerId || undefined,
      countryId: formData.countryId || undefined,
    };
    if (editingPlatform) {
      await updatePlatform(token, editingPlatform.id, data);
    } else {
      await createPlatform(token, data);
    }
    setSaving(false);
    setDialogOpen(false);
    loadData();
  };

  const handleDelete = async () => {
    if (!token || !deletingPlatform) return;
    await deletePlatform(token, deletingPlatform.id);
    loadData();
    setDeletingPlatform(null);
  };

  if (loading) {
    return (
      <AdminLayout title="Platforms">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-[hsl(var(--muted-foreground))]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Platforms">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[hsl(var(--muted-foreground))]">{platforms.length} platforms</p>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Platform
        </button>
      </div>

      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[hsl(var(--muted))]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Manufacturer</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Country</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-[hsl(var(--muted-foreground))]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {platforms.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]">
                  No platforms yet
                </td>
              </tr>
            ) : (
              platforms.map((platform) => (
                <tr key={platform.id} className="hover:bg-[hsl(var(--muted))]">
                  <td className="px-4 py-3 text-[hsl(var(--card-foreground))]">{platform.name}</td>
                  <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{platform.category?.categoryName || '-'}</td>
                  <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{platform.manufacturer?.name || '-'}</td>
                  <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{platform.country?.name || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(platform)}
                        className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] rounded hover:bg-[hsl(var(--muted))]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(platform)}
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

      {/* Create/Edit Dialog */}
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--card))] rounded-xl p-6 w-full max-w-lg max-h-[85vh] overflow-auto shadow-xl border border-[hsl(var(--border))] z-50">
            <Dialog.Title className="text-lg font-semibold text-[hsl(var(--card-foreground))] mb-4">
              {editingPlatform ? 'Edit Platform' : 'Create Platform'}
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
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Manufacturer *</label>
                  <select
                    value={formData.manufacturerId}
                    onChange={(e) => setFormData({ ...formData, manufacturerId: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                  >
                    {manufacturers.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Country *</label>
                  <select
                    value={formData.countryId}
                    onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                  >
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Unit Cost (USD)</label>
                  <input
                    type="number"
                    value={formData.unitCostUsd || ''}
                    onChange={(e) => setFormData({ ...formData, unitCostUsd: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Operational Status</label>
                <input
                  type="text"
                  value={formData.operationalStatus}
                  onChange={(e) => setFormData({ ...formData, operationalStatus: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[hsl(var(--card-foreground))]">Technical Specifications</label>
                  <button
                    type="button"
                    onClick={() => setFormData({ 
                      ...formData, 
                      technicalSpecs: { ...formData.technicalSpecs, '': '' } 
                    })}
                    className="text-xs text-[hsl(var(--primary))] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Spec
                  </button>
                </div>
                {formData.technicalSpecs && Object.keys(formData.technicalSpecs).length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {Object.entries(formData.technicalSpecs).map(([key, value], index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Spec name (e.g., Max Speed)"
                          value={key}
                          onChange={(e) => {
                            const newSpecs = { ...formData.technicalSpecs };
                            const oldValue = newSpecs[key];
                            delete newSpecs[key];
                            newSpecs[e.target.value] = oldValue;
                            setFormData({ ...formData, technicalSpecs: newSpecs });
                          }}
                          className="flex-1 px-3 py-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g., Mach 2.0)"
                          value={value}
                          onChange={(e) => setFormData({
                            ...formData,
                            technicalSpecs: { ...formData.technicalSpecs, [key]: e.target.value }
                          })}
                          className="flex-1 px-3 py-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newSpecs = { ...formData.technicalSpecs };
                            delete newSpecs[key];
                            setFormData({ ...formData, technicalSpecs: newSpecs });
                          }}
                          className="p-2 text-[hsl(var(--muted-foreground))] hover:text-red-500 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">No specifications added</p>
                )}
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
                disabled={saving || !formData.name || !formData.categoryId || !formData.manufacturerId || !formData.countryId}
                className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingPlatform ? 'Update' : 'Create'}
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

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Platform"
        description={`Are you sure you want to delete "${deletingPlatform?.name}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}