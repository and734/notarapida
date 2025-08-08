"use client";

import type { Note } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FileEdit, Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

const noteSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  content: z.string().optional(),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteEditorProps {
  selectedNote: Note | null;
  onSaveNote: (data: NoteFormValues) => void;
  isSaving: boolean;
  onBack?: () => void;
  isMobile: boolean;
}

export function NoteEditor({ selectedNote, onSaveNote, isSaving, onBack, isMobile }: NoteEditorProps) {
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (selectedNote) {
      form.reset({
        title: selectedNote.title,
        content: selectedNote.content,
      });
    } else {
      form.reset({
        title: "",
        content: "",
      });
    }
  }, [selectedNote, form]);

  if (!selectedNote) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <FileEdit className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No Note Selected</h2>
          <p className="mt-2 text-muted-foreground">Select a note from the list to edit, or create a new one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 md:p-6 h-full">
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back to list">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <CardTitle className="font-headline text-2xl">
          {selectedNote.id === "new" ? "Create New Note" : "Edit Note"}
        </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSaveNote)} className="flex flex-col h-full space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your note title" {...field} className="text-xl font-semibold !ring-offset-background"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-grow flex flex-col">
                  <FormLabel className="text-lg">Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Start writing your note here..."
                      className="h-full resize-none text-base flex-grow"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Note
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
    </div>
  );
}
