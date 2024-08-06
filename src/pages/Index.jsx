import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Play } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Index = () => {
  const [scriptContent, setScriptContent] = useState('');
  const [output, setOutput] = useState('');

  const handleRunScript = async () => {
    // TODO: Implement backend integration
    setOutput('Script execution output will be displayed here.');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="editor" className="w-full">
        <TabsList>
          <TabsTrigger value="editor">Script Editor</TabsTrigger>
          <TabsTrigger value="history">Execution History</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <Card>
            <CardHeader>
              <CardTitle>Custom Script Editor</CardTitle>
              <CardDescription>Write and execute your custom scripts here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your script here..."
                className="min-h-[200px] mb-4"
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
              />
              <Button onClick={handleRunScript} className="w-full">
                <Play className="mr-2 h-4 w-4" /> Run Script
              </Button>
            </CardContent>
          </Card>
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
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
              <CardDescription>View past script executions and their results.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  Execution history will be implemented in future updates.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
