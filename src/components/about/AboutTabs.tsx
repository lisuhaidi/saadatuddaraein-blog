import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MukaddimahContent from './tabs/MukaddimahContent';
import VisiMisiContent from './tabs/VisiMisiContent';
import KontakContent from './tabs/KontakContent';

export default function AboutTabs() {
  return (
    <Tabs defaultValue="mukaddimah" className="w-full">
      <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 bg-muted text-muted-foreground p-1 rounded-lg border">
        <TabsTrigger 
          value="mukaddimah"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Mukaddimah
        </TabsTrigger>
        <TabsTrigger 
          value="visi-misi"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Visi dan Misi
        </TabsTrigger>
        <TabsTrigger 
          value="kontak"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Kontak
        </TabsTrigger>
      </TabsList>

      <TabsContent value="mukaddimah">
        <MukaddimahContent />
      </TabsContent>

      <TabsContent value="visi-misi">
        <VisiMisiContent />
      </TabsContent>

      <TabsContent value="kontak">
        <KontakContent />
      </TabsContent>
    </Tabs>
  );
}