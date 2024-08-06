import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Play, Save, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion";

const Index = () => {
  const [scriptModules, setScriptModules] = useState([]);
  const [sandboxFiles, setSandboxFiles] = useState([]);
  const [scriptContent, setScriptContent] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    // Load script modules and sandbox files from localStorage
    const savedModules = JSON.parse(localStorage.getItem('scriptModules')) || [];
    const savedFiles = JSON.parse(localStorage.getItem('sandboxFiles')) || [];
    setScriptModules(savedModules);
    setSandboxFiles(savedFiles);
  }, []);

  const handleSaveScript = () => {
    const newModule = { id: Date.now(), name: `Script ${scriptModules.length + 1}`, content: scriptContent };
    const updatedModules = [...scriptModules, newModule];
    setScriptModules(updatedModules);
    localStorage.setItem('scriptModules', JSON.stringify(updatedModules));
    setScriptContent('');
  };

  const handleDeleteModule = (id) => {
    const updatedModules = scriptModules.filter(module => module.id !== id);
    setScriptModules(updatedModules);
    localStorage.setItem('scriptModules', JSON.stringify(updatedModules));
  };

  const handleDragStart = (e, moduleId) => {
    e.dataTransfer.setData('moduleId', moduleId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const moduleId = e.dataTransfer.getData('moduleId');
    const module = scriptModules.find(m => m.id === parseInt(moduleId));
    if (module) {
      // Here you would typically execute the script on the sandbox files
      // For now, we'll just add it to the sandbox
      const newFile = { id: Date.now(), name: module.name, content: module.content };
      const updatedFiles = [...sandboxFiles, newFile];
      setSandboxFiles(updatedFiles);
      localStorage.setItem('sandboxFiles', JSON.stringify(updatedFiles));
      setOutput(`Executed script: ${module.name}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Script Sandbox</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Script Editor</CardTitle>
              <CardDescription>Write and save your custom scripts here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your script here..."
                className="min-h-[200px] mb-4"
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
              />
              <Button onClick={handleSaveScript} className="w-full">
                <Save className="mr-2 h-4 w-4" /> Save Script
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Sandbox</CardTitle>
              <CardDescription>Drag scripts here to execute them.</CardDescription>
            </CardHeader>
            <CardContent onDragOver={handleDragOver} onDrop={handleDrop} className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-md p-4">
              {sandboxFiles.map(file => (
                <div key={file.id} className="mb-2 p-2 bg-secondary rounded-md">
                  {file.name}
                </div>
              ))}
              {sandboxFiles.length === 0 && <p className="text-muted-foreground">Drop scripts here</p>}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Script Modules</CardTitle>
            <CardDescription>Drag these modules to the sandbox to execute them.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {scriptModules.map(module => (
                <div
                  key={module.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, module.id)}
                  className="p-2 bg-accent rounded-md flex justify-between items-center cursor-move"
                >
                  <span>{module.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteModule(module.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <pre>{output}</pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
