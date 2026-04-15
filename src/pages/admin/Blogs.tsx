import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import AdminLayout from '../../components/admin/AdminLayout';
import DeleteConfirmDialog from '../../components/admin/DeleteConfirmDialog';
import { useAuthStore } from '../../store/useAuthStore';
import type { Blog } from '../../types';
import { fetchBlogs, createBlog, updateBlog, deleteBlog, type CreateBlogData } from '../../lib/api';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';

export default function BlogsPage() {
  const { token } = useAuthStore();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<CreateBlogData>({ title: '', summary: '', content: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    const data = await fetchBlogs();
    setBlogs(data);
    setLoading(false);
  };

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setFormData({ title: '', summary: '', content: '' });
    setDialogOpen(true);
  };

  const handleOpenEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, summary: blog.summary || '', content: blog.content || '' });
    setDialogOpen(true);
  };

  const handleOpenDelete = (blog: Blog) => {
    setDeletingBlog(blog);
    setDeleteOpen(true);
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    if (editingBlog) {
      await updateBlog(token, editingBlog.id, formData);
    } else {
      await createBlog(token, formData);
    }
    setSaving(false);
    setDialogOpen(false);
    loadBlogs();
  };

  const handleDelete = async () => {
    if (!token || !deletingBlog) return;
    await deleteBlog(token, deletingBlog.id);
    loadBlogs();
    setDeletingBlog(null);
  };

  if (loading) {
    return (
      <AdminLayout title="Blogs">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-[hsl(var(--muted-foreground))]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Blogs">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[hsl(var(--muted-foreground))]">{blogs.length} blog posts</p>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Blog
        </button>
      </div>

      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[hsl(var(--muted))]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Summary</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-[hsl(var(--muted-foreground))]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]">
                  No blogs yet
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-[hsl(var(--muted))]">
                  <td className="px-4 py-3 text-[hsl(var(--card-foreground))]">{blog.title}</td>
                  <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] line-clamp-1">{blog.summary || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(blog)}
                        className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] rounded hover:bg-[hsl(var(--muted))]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(blog)}
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
              {editingBlog ? 'Edit Blog' : 'Create Blog'}
            </Dialog.Title>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Summary</label>
                <input
                  type="text"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--card-foreground))]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--card-foreground))] mb-1">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={6}
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
                disabled={saving || !formData.title || !formData.content}
                className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingBlog ? 'Update' : 'Create'}
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
        title="Delete Blog"
        description={`Are you sure you want to delete "${deletingBlog?.title}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}