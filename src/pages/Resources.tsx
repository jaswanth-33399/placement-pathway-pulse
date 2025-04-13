
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Materials } from '@/components/resources/Materials';
import { QuizGenerator } from '@/components/resources/QuizGenerator';

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Interview Resources</h1>
          <p className="text-gray-600 mt-1">Prepare for interviews with materials and AI-powered quizzes</p>
        </div>
        
        <div className="mb-6">
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="ai-quizzes">AI Quizzes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials" className="space-y-6">
            <Materials />
          </TabsContent>
          
          <TabsContent value="ai-quizzes" className="space-y-6">
            <QuizGenerator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Resources;
