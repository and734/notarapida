"use client";

import type { Note } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { NoteEditor } from "@/components/note-editor";
import { NoteList } from "@/components/note-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const initialNotes: Note[] = [
  {
    id: '1',
    title: "Welcome to Nota Rapida!",
    content: "This is a simple, fast, and beautiful note-taking app. You can create, edit, and delete notes. The interface is designed to be clean and intuitive. Enjoy!",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: "My Grocery List",
    content: "- Milk\n- Bread\n- Eggs\n- Coffee\n- Bananas",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: "Meeting Notes - Project Phoenix",
    content: "- Discussed Q3 roadmap.\n- Finalized UI mockups.\n- Assigned tasks for the upcoming sprint.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
];


export function NoteApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
    setNotes(initialNotes);
    if(initialNotes.length > 0) {
        setSelectedNoteId(initialNotes[0].id)
    }
  }, [])


  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = useState<"list" | "editor">("list");

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
    if (isMobile) {
      setMobileView("editor");
    }
  };

  const handleNewNote = () => {
    const newNote: Note = {
      id: "new",
      title: "New Note",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Deselect if already on a new note, otherwise add it
    if(selectedNoteId === 'new') {
      return;
    }
    setNotes((prev) => [newNote, ...prev]);
    setSelectedNoteId("new");
    if (isMobile) {
      setMobileView("editor");
    }
  };

  const handleSaveNote = (data: { title: string; content?: string }) => {
    setIsSaving(true);
    setTimeout(() => {
      if (selectedNoteId === "new") {
        const newNote: Note = {
          id: Date.now().toString(),
          ...data,
          content: data.content || "",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setNotes((prev) => [newNote, ...prev.filter((n) => n.id !== "new")]);
        setSelectedNoteId(newNote.id);
        toast({ title: "Note Created!", description: "Your new note has been saved." });
      } else {
        setNotes((prev) =>
          prev.map((n) =>
            n.id === selectedNoteId ? { ...n, ...data, updatedAt: new Date() } : n
          )
        );
        toast({ title: "Note Updated!", description: "Your changes have been saved." });
      }
      setIsSaving(false);
    }, 500);
  };
  
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(notes.length > 1 ? notes.find(n => n.id !== id)?.id || null : null);
    }
    toast({ title: "Note Deleted", variant: "destructive", description: "The note has been permanently removed." });
  };
  
  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
        <div className="flex items-center gap-4">
            <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" />
            </svg>
            <h1 className="font-headline text-2xl font-bold text-foreground">Nota Rapida</h1>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex-grow overflow-hidden bg-secondary/40">
        <div className="grid h-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div className={cn("h-full bg-card", isMobile && mobileView !== 'list' && 'hidden')}>
            <NoteList
              notes={notes.filter(n => n.id !== 'new')}
              selectedNoteId={selectedNoteId}
              onSelectNote={handleSelectNote}
              onDeleteNote={handleDeleteNote}
              onNewNote={handleNewNote}
            />
          </div>
          <div className={cn("md:col-span-2 lg:col-span-3 h-full", isMobile && mobileView !== 'editor' && 'hidden')}>
            <NoteEditor
              selectedNote={selectedNote}
              onSaveNote={handleSaveNote}
              isSaving={isSaving}
              onBack={() => setMobileView("list")}
              isMobile={!!isMobile}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
