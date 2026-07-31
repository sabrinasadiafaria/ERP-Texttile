import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UploadCloud, File, Loader2, Download, Trash2 } from 'lucide-react';

interface DocumentUploaderProps {
  projectId: string;
}

export function DocumentUploader({ projectId }: DocumentUploaderProps) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchDocuments = async () => {
    const { data } = await supabase
      .from('project_documents')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    if (data) setDocuments(data);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    setIsUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${projectId}/${Math.random()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('project-documents')
        .upload(fileName, file);
        
      if (!uploadError && data) {
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('project-documents')
          .getPublicUrl(fileName);
          
        // Save to DB
        await supabase.from('project_documents').insert([{
          project_id: projectId,
          name: file.name,
          type: file.type || fileExt,
          url: publicUrl,
        }]);
      } else {
        console.error('Upload error:', uploadError);
      }
    }
    await fetchDocuments();
    setIsUploading(false);
  };

  const handleDelete = async (id: string, url: string) => {
    const fileName = url.split('/').pop();
    if (fileName) {
      await supabase.storage.from('project-documents').remove([`${projectId}/${fileName}`]);
    }
    await supabase.from('project_documents').delete().eq('id', id);
    fetchDocuments();
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors
          ${dragActive ? 'border-[#0047ff] bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleChange}
          accept=".pdf,.docx,.xlsx,.png,.jpg,.zip"
        />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-blue-100 text-[#0047ff] rounded-full">
            {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <UploadCloud className="w-6 h-6" />}
          </div>
          <div className="text-sm text-gray-600">
            <button 
              className="font-semibold text-[#0047ff] hover:underline"
              onClick={() => inputRef.current?.click()}
            >
              Click to upload
            </button>{' '}
            or drag and drop
          </div>
          <p className="text-xs text-gray-500">PDF, DOCX, XLSX, PNG, JPG (Max 10MB)</p>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        {documents.map(doc => (
          <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-900 truncate">{doc.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors" title="Download">
                <Download className="w-4 h-4" />
              </a>
              <button onClick={() => handleDelete(doc.id, doc.url)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
