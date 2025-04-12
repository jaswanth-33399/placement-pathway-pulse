
import React, { useState, useMemo } from 'react';
import NavBar from '@/components/NavBar';
import InternshipCard from '@/components/InternshipCard';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Internships: React.FC = () => {
  const { internships, savedInternships, saveInternship, unsaveInternship } = useData();
  
  // Filters
  const [role, setRole] = useState('');
  const [period, setPeriod] = useState('');
  const [mode, setMode] = useState<'all' | 'offline' | 'online'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get unique roles and periods for filter options
  const uniqueRoles = useMemo(() => {
    const roles = new Set(internships.map(internship => internship.role));
    return Array.from(roles);
  }, [internships]);
  
  const uniquePeriods = useMemo(() => {
    const periods = new Set(internships.map(internship => internship.period));
    return Array.from(periods);
  }, [internships]);
  
  // Filter internships based on selected criteria
  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      const matchesRole = !role || internship.role === role;
      const matchesPeriod = !period || internship.period === period;
      const matchesMode = mode === 'all' || internship.mode === mode;
      const matchesSearch = !searchQuery || 
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRole && matchesPeriod && matchesMode && matchesSearch;
    });
  }, [internships, role, period, mode, searchQuery]);
  
  // Handle save/unsave internship
  const handleSaveInternship = (id: string) => {
    saveInternship(id);
    toast.success('Internship saved to your collection');
  };
  
  const handleUnsaveInternship = (id: string) => {
    unsaveInternship(id);
    toast.success('Internship removed from your collection');
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setRole('');
    setPeriod('');
    setMode('all');
    setSearchQuery('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Internships</h1>
          <p className="text-gray-600 mt-1">Find and apply for internships that match your interests</p>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by company, role, or keywords"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Roles</SelectItem>
                  {uniqueRoles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="period">Duration</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Durations</SelectItem>
                  {uniquePeriods.map(period => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="mode">Work Mode</Label>
              <Select value={mode} onValueChange={(value) => setMode(value as 'all' | 'offline' | 'online')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="offline">On-site</SelectItem>
                  <SelectItem value="online">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleResetFilters}>Reset Filters</Button>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-4">
          <h2 className="text-xl font-medium">
            {filteredInternships.length} {filteredInternships.length === 1 ? 'result' : 'results'} found
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map(internship => (
            <InternshipCard
              key={internship.id}
              id={internship.id}
              company={internship.company}
              role={internship.role}
              period={internship.period}
              mode={internship.mode}
              description={internship.description}
              applyLink={internship.applyLink}
              isSaved={savedInternships.includes(internship.id)}
              onSave={() => handleSaveInternship(internship.id)}
              onUnsave={() => handleUnsaveInternship(internship.id)}
            />
          ))}
        </div>
        
        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No internships match your filters</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria</p>
            <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Internships;
