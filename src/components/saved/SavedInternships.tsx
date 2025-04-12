
import React, { useState, useEffect } from 'react';
import InternshipCard from '@/components/InternshipCard';
import { useData } from '@/context/DataContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { SavedInternship, SupabaseInternshipRecord } from '@/types/internship';

const SavedInternships: React.FC = () => {
  const { savedInternships, saveInternship, unsaveInternship } = useData();
  const [supabaseInternships, setSupabaseInternships] = useState<SavedInternship[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch saved internships from Supabase
  useEffect(() => {
    const fetchSavedInternships = async () => {
      if (savedInternships.length === 0) {
        setSupabaseInternships([]);
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('internships_raw')
          .select('*')
          .in('id', savedInternships);
        
        if (error) throw error;
        
        // Explicitly type the response data and then map to our application type
        const typedData = (data || []) as SupabaseInternshipRecord[];
        const internshipsWithId = typedData.map((item) => ({
          id: item.id || `internship-${Math.random().toString(36).substring(2, 9)}`,
          apply: item.apply,
          company: item.company,
          date: item.date,
          location: item.location,
          salary: item.salary,
          title: item.title,
          work_model: item.work_model
        }));
        
        setSupabaseInternships(internshipsWithId);
      } catch (err) {
        console.error('Error fetching saved internships:', err);
        toast.error('Failed to load saved internships');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSavedInternships();
  }, [savedInternships]);
  
  // Handle save/unsave
  const handleSaveInternship = (id: string) => {
    saveInternship(id);
    toast.success('Internship saved to your collection');
  };
  
  const handleUnsaveInternship = (id: string) => {
    unsaveInternship(id);
    toast.success('Internship removed from your collection');
  };
  
  if (loading) {
    return <div className="text-center py-12">Loading saved internships...</div>;
  }
  
  if (supabaseInternships.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No saved internships</h3>
        <p className="text-gray-500">Internships you save will appear here</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {supabaseInternships.map(internship => (
        <InternshipCard
          key={internship.id}
          id={internship.id}
          company={internship.company || 'Unknown Company'}
          role={internship.title || 'Untitled Internship'}
          period={internship.date || 'N/A'}
          mode={internship.work_model?.toLowerCase().includes('remote') ? 'online' : 'offline'}
          description={`${internship.location || ''} ${internship.salary ? '• ' + internship.salary : ''}`}
          applyLink={internship.apply || '#'}
          isSaved={true}
          onSave={() => handleSaveInternship(internship.id)}
          onUnsave={() => handleUnsaveInternship(internship.id)}
        />
      ))}
    </div>
  );
};

export default SavedInternships;
