import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newScriptName, setNewScriptName] = useState('');
  const [editingScriptId, setEditingScriptId] = useState(null);

  useEffect(() => {
    // Load script modules and sandbox files from localStorage
    const savedModules = JSON.parse(localStorage.getItem('scriptModules')) || [];
    const savedFiles = JSON.parse(localStorage.getItem('sandboxFiles')) || [];
    setScriptModules(savedModules);
    setSandboxFiles(savedFiles);
  }, []);

  const handleSaveScript = () => {
    setIsDialogOpen(true);
    setNewScriptName(`Script ${scriptModules.length + 1}`);
  };

  const handleConfirmSave = () => {
    if (editingScriptId) {
      const updatedModules = scriptModules.map(module => 
        module.id === editingScriptId ? { ...module, name: newScriptName, content: scriptContent } : module
      );
      setScriptModules(updatedModules);
      setEditingScriptId(null);
    } else {
      const newModule = { id: Date.now(), name: newScriptName, content: scriptContent };
      const updatedModules = [...scriptModules, newModule];
      setScriptModules(updatedModules);
    }
    localStorage.setItem('scriptModules', JSON.stringify(updatedModules));
    setScriptContent('');
    setIsDialogOpen(false);
  };

  const handleEditModule = (module) => {
    setScriptContent(module.content);
    setNewScriptName(module.name);
    setEditingScriptId(module.id);
    setIsDialogOpen(true);
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
      executeScript(module);
    }
  };

  const executeScript = (script) => {
    try {
      // Create a new Function from the script content
      const scriptFunction = new Function('sandboxFiles', script.content);
      
      // Execute the script with the current sandboxFiles
      const result = scriptFunction(sandboxFiles);
      
      // Update the output
      setOutput(`Executed script: ${script.name}\nResult: ${JSON.stringify(result, null, 2)}`);
      
      // Add the script to the sandbox
      const newFile = { id: Date.now(), name: script.name, content: script.content };
      const updatedFiles = [...sandboxFiles, newFile];
      setSandboxFiles(updatedFiles);
      localStorage.setItem('sandboxFiles', JSON.stringify(updatedFiles));
    } catch (error) {
      setOutput(`Error executing script: ${script.name}\n${error.message}`);
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
              <SyntaxHighlighter
                language="javascript"
                style={tomorrow}
                className="min-h-[200px] mb-4"
                customStyle={{
                  padding: '1rem',
                  borderRadius: '0.375rem',
                }}
              >
                {scriptContent}
              </SyntaxHighlighter>
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
                <div key={file.id} className="mb-2 p-2 bg-secondary rounded-md flex justify-between items-center">
                  <span>{file.name}</span>
                  <Button variant="outline" size="sm" onClick={() => executeScript(file)}>
                    <Play className="h-4 w-4 mr-2" /> Run
                  </Button>
                </div>
              ))}
              {sandboxFiles.length === 0 && <p className="text-muted-foreground">Drop scripts here</p>}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card className="mt-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingScriptId ? 'Edit Script' : 'Save Script'}</DialogTitle>
              </DialogHeader>
              <Input
                value={newScriptName}
                onChange={(e) => setNewScriptName(e.target.value)}
                placeholder="Enter script name"
              />
              <DialogFooter>
                <Button onClick={handleConfirmSave}>{editingScriptId ? 'Update' : 'Save'}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                  <div>
                    <Button variant="ghost" size="sm" onClick={() => handleEditModule(module)} className="mr-2">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteModule(module.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
